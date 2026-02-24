const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const authController = require("../controllers/authController");

module.exports = function initPassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
      },
      authController.verifyGoogleUser,
    ),
  );
};
