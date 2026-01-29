const reviewService = require("../services/reviewService");

const createReview = async (req, res) => {
  try {
    const review = req.body;
    const result = await reviewService.create(review);
    res.status(200).json({ message: result });
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

module.exports = { createReview, findAllByMediaId };
