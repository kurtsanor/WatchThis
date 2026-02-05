const authService = require("../services/authService");

const registerUser = async (req, res) => {
  try {
    await authService.registerUserApi(req.body);
    res.status(201).json({ message: "User has been registered" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const loginResponse = await authService.loginApi(req.body);
    if (!loginResponse) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    return res
      .status(200)
      .json({ message: "Login sucessful", token: loginResponse });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { registerUser, login };
