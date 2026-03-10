const reviewService = require("../services/reviewService");

const isReviewOwner = async (req, res, next) => {
  try {
    const resource = await reviewService.findById(req.params.reviewId);

    if (!resource) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (resource.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.review = resource;
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { isReviewOwner };
