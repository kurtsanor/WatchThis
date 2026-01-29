const express = require("express");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const movieRoutes = require("./routes/movieRoutes");
const tvRoutes = require("./routes/tvRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/movies", movieRoutes);
app.use("/tv", tvRoutes);
app.use("/reviews", reviewRoutes);

module.exports = app;
