const { param, query, body } = require("express-validator");

const create = [
  body("mediaId").notEmpty().withMessage("Media ID is required"),
  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .bail()
    .isInt({ min: 1, max: 5 })
    .withMessage("Invalid rating. Must be numerical (1 - 5)"),
  body("reviewText").notEmpty().withMessage("Review text is required"),
];

const update = [
  param("reviewId").isMongoId().withMessage("Invalid ID"),
  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .bail()
    .isInt({ min: 1, max: 5 })
    .withMessage("Invalid rating. Must be numerical (1 - 5)"),
  body("reviewText").notEmpty().withMessage("Review text is required"),
];

const remove = [param("reviewId").isMongoId().withMessage("Invalid ID")];

const mediaId = [
  param("mediaId").isInt({ min: 1 }).withMessage("Invalid Media ID"),
];

const mediaAndUser = [
  query("mediaId").isInt({ min: 1 }).withMessage("Invalid Media ID"),
  query("userId").notEmpty().withMessage("User ID is required"),
];

module.exports = { create, mediaId, mediaAndUser, update, remove };
