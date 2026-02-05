const User = require("../models/User");

const createUserApi = async (user) => {
  return await User.create(user);
};

const findByEmailApi = async (email) => {
  return await User.findOne({ email: email });
};

const findByIdApi = async (id) => {
  return await User.findById(id);
};

module.exports = { createUserApi, findByEmailApi, findByIdApi };
