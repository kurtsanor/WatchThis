const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const { verifyJwt } = require("../middlewares/authMiddleware");
const { favoriteValidator } = require("../validations");
const validate = require("../middlewares/validatorMiddleware");

// require authentication for all routes
router.use(verifyJwt);

router.post(
  "/",
  favoriteValidator.addFavorite,
  validate,
  favoriteController.addFavorite,
);
router.get("/", favoriteController.findFavoritesByUser);
router.get("/media", favoriteController.findAllByUserWithDetails);
router.delete(
  "/:mediaId",
  favoriteValidator.removeFavorite,
  validate,
  favoriteController.removeFavorite,
);

module.exports = router;
