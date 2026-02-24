const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: JWT must be provided." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token is expired or invalid" });
  }
};

module.exports = { verifyJwt };
