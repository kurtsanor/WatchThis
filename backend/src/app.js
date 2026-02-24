const express = require("express");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const movieRoutes = require("./routes/movieRoutes");
const tvRoutes = require("./routes/tvRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cors = require("cors");

const passport = require("passport");
const session = require("express-session");
const initPassport = require("./config/passport");
const authGoogleRoutes = require("./routes/authGoogle");


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

initPassport();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/auth", authGoogleRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/movies", movieRoutes);
app.use("/tv", tvRoutes);
app.use("/reviews", reviewRoutes);

module.exports = app;
