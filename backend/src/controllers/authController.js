const authService = require("../services/authService");
const jwtUtil = require("../utils/jwtUtil");
const User = require("../models/User");

const registerUser = async (req, res, next) => {
  try {
    await authService.registerUserApi(req.body);
    res.status(201).json({ message: "User has been registered" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const loginResponse = await authService.loginApi(req.body);
    if (!loginResponse) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    return res
      .status(200)
      .json({ message: "Login sucessful", token: loginResponse });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const googleAuthCallback = async (req, res) => {
  const token = jwtUtil.generateToken(req.user);
  return res.redirect(
    `${process.env.FRONTEND_URL}/oauth-success?token=${encodeURIComponent(token)}`,
  );
};

const verifyGoogleUser = async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value?.toLowerCase();
    if (!email) return done(new Error("Google did not return an email"));

    const googleId = profile.id;
    const avatar = profile.photos?.[0]?.value || "";
    const displayName = profile.displayName || "";

    // Try find user by googleId first
    let user = await User.findOne({ googleId });

    // If not found, link by email or create
    if (!user) {
      user = await User.findOne({ email });

      if (user) {
        user.googleId = googleId;
        if (!user.avatar && avatar) user.avatar = avatar;

        // only fill names if empty
        if (!user.firstName || !user.lastName) {
          const parts = displayName.trim().split(/\s+/);
          user.firstName = user.firstName || parts[0] || "User";
          user.lastName = user.lastName || parts.slice(1).join(" ") || "Google";
        }

        await user.save();
      } else {
        const parts = displayName.trim().split(/\s+/);
        const firstName = parts[0] || "User";
        const lastName = parts.slice(1).join(" ") || "Google";

        user = await User.create({
          email,
          firstName,
          lastName,
          googleId,
          avatar,
        });
      }
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const setPassword = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { currentPassword, password } = req.body; // password = new password

    await authService.setPasswordApi(userId, currentPassword, password);

    res.json({ message: "Password updated successfully." });
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

module.exports = {
  registerUser,
  login,
  googleAuthCallback,
  verifyGoogleUser,
  setPassword,
};
