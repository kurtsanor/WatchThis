const Review = require("../models/Review");

const create = async (review) => {
  return await Review.create(review);
};

const findAllByMediaIdApi = async (mediaId) => {
  return await Review.find({ mediaId }).populate("userId");
};

module.exports = { create, findAllByMediaIdApi };
