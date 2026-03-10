const { body, param } = require("express-validator");

const addFavorite = [
  body("mediaId")
    .notEmpty()
    .withMessage("Media ID is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Invalid Media ID"),

  body("mediaType")
    .notEmpty()
    .withMessage("Media Type is required")
    .bail()
    .isIn(["movies", "tvshows"])
    .withMessage("Media type must be 'movies' or 'tvshows'"),
  ,
];

const removeFavorite = [
  param("mediaId").isInt({ min: 1 }).withMessage("Invalid Media ID"),
];

module.exports = { addFavorite, removeFavorite };
