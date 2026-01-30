const reviewController = require("../controllers/reviewController");
const express = require("express");
const router = express.Router();

router.post("/", reviewController.createReview);
router.get("/media/:mediaId", reviewController.findAllByMediaId);
router.get("/existence", reviewController.existsByMediaAndUser);
router.get("/find", reviewController.findByMediaAndUser);
router.patch("/:reviewId", reviewController.updateReview);
router.delete("/:reviewId", reviewController.deleteReview);

module.exports = router;
