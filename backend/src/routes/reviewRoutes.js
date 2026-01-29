const reviewController = require("../controllers/reviewController");
const express = require("express");
const router = express.Router();

router.post("/", reviewController.createReview);
router.get("/media/:mediaId", reviewController.findAllByMediaId);

module.exports = router;
