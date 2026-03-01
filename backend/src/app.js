const express = require("express");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const movieRoutes = require("./routes/movieRoutes");
const tvRoutes = require("./routes/tvRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cors = require("cors");

const passport = require("passport");
const initPassport = require("./config/passport");
const getConnection = require("./config/db");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

initPassport();
app.use(passport.initialize());

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await getConnection();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/movies", movieRoutes);
app.use("/tv", tvRoutes);
app.use("/reviews", reviewRoutes);

module.exports = app;
