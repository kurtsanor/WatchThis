const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const { verifyJwt } = require("../middlewares/authMiddleware");
const { authValidator } = require("../validations");
const validate = require("../middlewares/validatorMiddleware");

router.post(
  "/register",
  authValidator.register,
  validate,
  authController.registerUser,
);
router.post("/login", authValidator.login, validate, authController.login);
router.post(
  "/set-password",
  authValidator.setPassword,
  validate,
  verifyJwt,
  authController.setPassword,
);
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
