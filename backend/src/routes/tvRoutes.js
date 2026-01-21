const express = require("express");
const router = express.Router();
const tvController = require("../controllers/tvController");

router.get("/", tvController.findByGenreAndPage);
router.get("/search", tvController.searchByTitleAndPage);
router.get("/:id", tvController.findDetailsById);
router.get("/:id/credits", tvController.findCreditsById);

module.exports = router;
