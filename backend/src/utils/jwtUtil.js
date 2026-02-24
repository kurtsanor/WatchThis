const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id.toString(), email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1s" },
  );
};

module.exports = {
  generateToken,
};
