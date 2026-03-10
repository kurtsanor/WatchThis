const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const { mediaValidator } = require("../validations");
const validate = require("../middlewares/validatorMiddleware");

router.get(
  "/",
  mediaValidator.pageAndGenre,
  validate,
  movieController.findByGenreAndPage,
);
router.get("/search", movieController.searchByTitleAndPage);
router.get("/search-global", movieController.globalSearch);
router.get(
  "/trailer/:type/:id",
  mediaValidator.trailer,
  validate,
  movieController.findTrailerByTypeAndId,
);
router.get("/trending", movieController.findPlayingNow);
router.get("/on_the_air", movieController.findOnTheAir);
router.get(
  "/:id",
  mediaValidator.mediaId,
  validate,
  movieController.findDetailsById,
);
router.get(
  "/:id/credits",
  mediaValidator.mediaId,
  validate,
  movieController.findCreditsById,
);

module.exports = router;
