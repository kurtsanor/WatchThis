const reviewController = require("../controllers/reviewController");
const express = require("express");
const { verifyJwt } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyJwt, reviewController.createReview);
router.get("/media/:mediaId", reviewController.findAllByMediaId);
router.get("/existence", reviewController.existsByMediaAndUser);
router.get("/find", verifyJwt, reviewController.findByMediaAndUser);
router.patch("/:reviewId", verifyJwt, reviewController.updateReview);
router.delete("/:reviewId", verifyJwt, reviewController.deleteReview);

module.exports = router;
