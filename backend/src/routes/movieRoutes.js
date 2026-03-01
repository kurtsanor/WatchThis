const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/", movieController.findByGenreAndPage);
router.get("/search", movieController.searchByTitleAndPage);
router.get("/search-global", movieController.globalSearch);
router.get("/trailer/:type/:id", movieController.findTrailerByTypeAndId);
router.get("/trending", movieController.findPlayingNow);
router.get("/on_the_air", movieController.findOnTheAir);
router.get("/:id", movieController.findDetailsById);
router.get("/:id/credits", movieController.findCreditsById);

module.exports = router;
