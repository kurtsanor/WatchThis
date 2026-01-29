const userService = require("./userService");
const bcrypt = require("bcrypt");
const Credential = require("../models/Credential");

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
    throw new Error("Email does not exist");
  }
  const result = await Credential.findOne({
    userId: findResult._id,
  });
  return (await bcrypt.compare(loginRequest.password, result.password))
    ? findResult
    : null;
};

module.exports = { registerUserApi, loginApi };
