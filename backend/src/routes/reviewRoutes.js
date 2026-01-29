const reviewController = require("../controllers/reviewController");
const express = require("express");
const router = express.Router();

router.post("/", reviewController.createReview);
router.get("/media/:mediaId", reviewController.findAllByMediaId);
router.get("/existence", reviewController.existsByMediaAndUser);

module.exports = router;
