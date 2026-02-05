const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const user = await userService.createUserApi(req.body);
    console.log("User result is ", user);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.findByIdApi(id);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, findById };
