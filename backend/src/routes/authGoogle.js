const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

function signToken(user) {
  return jwt.sign(
    { id: user._id.toString(), email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
    );
}

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: true, failureRedirect: `${process.env.FRONTEND_URL}/login` }),
  (req, res) => {
    const token = signToken(req.user);

    return res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${encodeURIComponent(token)}`);
  }
);

module.exports = router;
