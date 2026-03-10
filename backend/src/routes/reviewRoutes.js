const reviewController = require("../controllers/reviewController");
const express = require("express");
const { verifyJwt } = require("../middlewares/authMiddleware");
const { isReviewOwner } = require("../middlewares/ownerMiddleware");
const { reviewValidator } = require("../validations");
const validate = require("../middlewares/validatorMiddleware");

const router = express.Router();

router.post(
  "/",
  reviewValidator.create,
  validate,
  verifyJwt,
  reviewController.createReview,
);
router.get(
  "/media/:mediaId",
  reviewValidator.mediaId,
  validate,
  reviewController.findAllByMediaId,
);
router.get(
  "/existence",
  reviewValidator.mediaAndUser,
  validate,
  reviewController.existsByMediaAndUser,
);
router.get(
  "/find",
  reviewValidator.mediaAndUser,
  validate,
  verifyJwt,
  reviewController.findByMediaAndUser,
);
router.patch(
  "/:reviewId",
  reviewValidator.update,
  validate,
  verifyJwt,
  isReviewOwner,
  reviewController.updateReview,
);
router.delete(
  "/:reviewId",
  reviewValidator.remove,
  validate,
  verifyJwt,
  isReviewOwner,
  reviewController.deleteReview,
);

module.exports = router;
