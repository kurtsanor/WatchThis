const Review = require("../models/Review");

const create = async (review) => {
  return await Review.create(review);
};

const findAllByMediaIdApi = async (mediaId) => {
  return await Review.find({ mediaId })
    .populate("userId")
    .sort({ createdAt: -1 });
};

// checks if user has already reviewed a show
const existsByMediaAndUserApi = async (mediaId, userId) => {
  return await Review.findOne({ mediaId, userId });
};

const updateApi = async (reviewUpdateRequest) => {
  return await Review.findOneAndUpdate(
    {
      _id: reviewUpdateRequest._id,
    },
    {
      rating: reviewUpdateRequest.rating,
      reviewText: reviewUpdateRequest.reviewText,
    },
    { new: true, runValidators: true },
  );
};

module.exports = {
  create,
  findAllByMediaIdApi,
  existsByMediaAndUserApi,
  updateApi,
};
