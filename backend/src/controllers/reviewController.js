const reviewService = require("../services/reviewService");

const createReview = async (req, res, next) => {
  try {
    const review = {
      ...req.body,
      userId: req.user.id,
    };
    const result = await reviewService.create(review);
    res.status(200).json({ data: result });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const findAllByMediaId = async (req, res, next) => {
  try {
    const id = req.params.mediaId;
    const result = await reviewService.findAllByMediaIdApi(id);
    res.status(200).json({ data: result });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const existsByMediaAndUser = async (req, res, next) => {
  try {
    const mediaId = req.query.mediaId;
    const userId = req.query.userId;
    const result = await reviewService.existsByMediaAndUserApi(mediaId, userId);
    res.status(200).json({ data: Boolean(result) });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const findByMediaAndUser = async (req, res, next) => {
  try {
    const mediaId = req.query.mediaId;
    const userId = req.query.userId;
    const result = await reviewService.existsByMediaAndUserApi(mediaId, userId);
    res.status(200).json({ data: result });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const updateRequest = req.body;
    console.log("req body is", req.body);

    const result = await reviewService.updateApi(updateRequest);
    res.status(200).json({ data: result });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    // access the review mongoose document sent by middleware
    const result = await req.review.deleteOne();
    res.status(204).json({ data: result });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

module.exports = {
  createReview,
  findAllByMediaId,
  existsByMediaAndUser,
  findByMediaAndUser,
  updateReview,
  deleteReview,
};
