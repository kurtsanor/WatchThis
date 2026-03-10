const { body } = require("express-validator");

const login = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email")
    .bail()
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

const register = [
  body("firstName").notEmpty().withMessage("First Name is required"),
  body("lastName").notEmpty().withMessage("Last Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email")
    .bail()
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

const setPassword = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("password").notEmpty().withMessage("New password is required"),
];

module.exports = { login, register, setPassword };
