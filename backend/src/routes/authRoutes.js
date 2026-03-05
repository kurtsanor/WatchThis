const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const { verifyJwt } = require("../middlewares/authMiddleware");

router.post("/register", authController.registerUser);
router.post("/login", authController.login);
router.post("/set-password", verifyJwt, authController.setPassword);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  authController.googleAuthCallback,
);

module.exports = router;
