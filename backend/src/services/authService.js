const userService = require("./userService");
const bcrypt = require("bcrypt");
const Credential = require("../models/Credential");
const jwt = require("jsonwebtoken");

const registerUserApi = async (registerRequest) => {
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
  const isMatch = await bcrypt.compare(loginRequest.password, result.password);
  if (!isMatch) {
    throw new Error("Incorrect login credentials");
  }
  const payload = { id: findResult._id, email: findResult.email };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

module.exports = { registerUserApi, loginApi };
