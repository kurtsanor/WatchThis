const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");

module.exports = function initPassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
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
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (e) {
      done(e);
    }
  });
};
