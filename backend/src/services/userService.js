const User = require("../models/User");

const createUserApi = async (user) => {
  return await User.create(user);
};

const findByEmailApi = async (email) => {
  return await User.findOne({ email: email });
};

module.exports = { createUserApi, findByEmailApi };
