const express = require("express");
const router = express.Router();
const tvController = require("../controllers/tvController");
const { mediaValidator } = require("../validations");
const validate = require("../middlewares/validatorMiddleware");

router.get(
  "/",
  mediaValidator.pageAndGenre,
  validate,
  tvController.findByGenreAndPage,
);
router.get("/search", tvController.searchByTitleAndPage);
router.get(
  "/:id",
  mediaValidator.mediaId,
  validate,
  tvController.findDetailsById,
);
router.get(
  "/:id/credits",
  mediaValidator.mediaId,
  validate,
  tvController.findCreditsById,
);

module.exports = router;
