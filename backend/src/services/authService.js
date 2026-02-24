const userService = require("./userService");
const bcrypt = require("bcrypt");
const Credential = require("../models/Credential");
const jwtUtil = require("../utils/jwtUtil");

const registerUserApi = async (registerRequest) => {
  const isExistingUser = userService.findByEmailApi(registerRequest.email);
  if (isExistingUser) {
    throw new Error("Email is already in use.");
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
    throw new Error("This email is registered via Google. Log in with that.");
  }
  const isMatch = await bcrypt.compare(loginRequest.password, result.password);
  if (!isMatch) {
    throw new Error("Incorrect login credentials");
  }
  return jwtUtil.generateToken(findResult);
};

module.exports = { registerUserApi, loginApi };
