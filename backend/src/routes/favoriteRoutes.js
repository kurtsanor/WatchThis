const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const { verifyJwt } = require("../middlewares/authMiddleware");

// require authentication for all routes
router.use(verifyJwt);

router.post("/", favoriteController.addFavorite);
router.get("/", favoriteController.findFavoritesByUser);
router.get("/media", favoriteController.findAllByUserWithDetails);
router.delete("/:mediaId", favoriteController.removeFavorite);

module.exports = router;
