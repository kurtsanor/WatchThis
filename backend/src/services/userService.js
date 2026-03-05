const User = require("../models/User");
const Credential = require("../models/Credential");

const createUserApi = async (user) => {
  return await User.create(user);
};

const findByEmailApi = async (email) => {
  return await User.findOne({ email: email });
};

const findByIdApi = async (id) => {
  const user = await User.findById(id).lean();
  if (!user) return null;

  const cred = await Credential.findOne({ userId: id }).select("_id").lean();

  return { ...user, hasPassword: !!cred };
};

module.exports = { createUserApi, findByEmailApi, findByIdApi };
