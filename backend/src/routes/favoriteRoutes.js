const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const { verifyJwt } = require("../middlewares/authMiddleware");

// require authentication for all routes
router.use(verifyJwt);

router.post("/", favoriteController.addFavorite);
router.get("/", favoriteController.findFavoritesByUser);
router.delete("/", favoriteController.removeFavorite);
router.get("/user/:id", favoriteController.findAllByUserWithDetails);

module.exports = router;
