const userService = require("./userService");
const bcrypt = require("bcrypt");
const Credential = require("../models/Credential");
const jwtUtil = require("../utils/jwtUtil");

const registerUserApi = async (registerRequest) => {
  const isExistingUser = await userService.findByEmailApi(
    registerRequest.email,
  );
  if (isExistingUser) {
    const error = new Error("Email is already in use.");
    error.status = 400;
    throw error;
  }
  const user = {
    firstName: registerRequest.firstName,
    lastName: registerRequest.lastName,
    email: registerRequest.email,
  };
  const createdUser = await userService.createUserApi(user);
  const hashedPassword = await bcrypt.hash(registerRequest.password, 10);
  const credentials = {
    userId: createdUser._id,
    password: hashedPassword,
  };
  await Credential.insertOne(credentials);
};

const loginApi = async (loginRequest) => {
  const findResult = await userService.findByEmailApi(loginRequest.email);
  if (!findResult) {
    throw new Error("Email does not exist.");
  }
  const result = await Credential.findOne({
    userId: findResult._id,
  });
  if (findResult.googleId && !result?.password) {
    throw new Error(
      "This email is registered via Google. Log in via google first then set a password in the setting.",
    );
  }
  const isMatch = await bcrypt.compare(loginRequest.password, result.password);
  if (!isMatch) {
    throw new Error("Incorrect login credentials");
  }
  return jwtUtil.generateToken(findResult);
};

const setPasswordApi = async (userId, currentPassword, newPassword) => {
  const existingCredential = await Credential.findOne({ userId });

  // If user already has a password, require current password
  if (existingCredential) {
    if (!currentPassword) {
      throw new Error("Current password is required to change your password.");
    }

    const ok = await bcrypt.compare(
      currentPassword,
      existingCredential.password,
    );
    if (!ok) {
      throw new Error("Current password is incorrect.");
    }

    existingCredential.password = await bcrypt.hash(newPassword, 10);
    await existingCredential.save();
    return;
  }

  // If no password yet (e.g., Google-first), just set it
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await Credential.create({
    userId,
    password: hashedPassword,
  });
};

module.exports = { registerUserApi, loginApi, setPasswordApi };
