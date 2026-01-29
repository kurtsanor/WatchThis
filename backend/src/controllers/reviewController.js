const { overwriteMiddlewareResult } = require("mongoose");
const reviewService = require("../services/reviewService");

const createReview = async (req, res) => {
  try {
    const review = req.body;
    const result = await reviewService.create(review);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findAllByMediaId = async (req, res) => {
  try {
    const id = req.params.mediaId;
    const result = await reviewService.findAllByMediaIdApi(id);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const existsByMediaAndUser = async (req, res) => {
  try {
    const mediaId = req.query.mediaId;
    const userId = req.query.userId;
    const result = await reviewService.existsByMediaAndUserApi(mediaId, userId);
    res.status(200).json({ data: Boolean(result) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createReview, findAllByMediaId, existsByMediaAndUser };
