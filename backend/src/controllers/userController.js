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

module.exports = { createUser };
