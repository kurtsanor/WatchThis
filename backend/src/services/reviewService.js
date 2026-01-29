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

module.exports = { create, findAllByMediaIdApi, existsByMediaAndUserApi };
