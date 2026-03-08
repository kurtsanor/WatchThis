const express = require("express");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const movieRoutes = require("./routes/movieRoutes");
const tvRoutes = require("./routes/tvRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cors = require("cors");
const helmet = require("helmet");

const passport = require("passport");
const initPassport = require("./config/passport");

const app = express();

app.use(helmet());

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

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/movies", movieRoutes);
app.use("/tv", tvRoutes);
app.use("/reviews", reviewRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack); // Logs error details for debugging.
  const statusCode = err.status || 500; // Sets status code (default: 500 Internal Server Error).
  const message = err.message || "Internal Server Error"; // Sets a generic error message.
  res.status(statusCode).json({ message: message }); // Sends the error response to the client.
});

module.exports = app;
