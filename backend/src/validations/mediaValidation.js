const { param, query } = require("express-validator");

const trailer = [
  param("type")
    .isIn(["movie", "tv"])
    .withMessage("Media type must be 'movie' or 'tv'"),
  param("id").isInt({ min: 1 }).withMessage("Invalid Media ID"),
];

const mediaId = [param("id").isInt({ min: 1 }).withMessage("Invalid Media ID")];

const pageAndGenre = [
  query("page").optional().isInt({ min: 1 }).withMessage("Invalid Media ID"),
  query("genre").optional().isInt({ min: 1 }).withMessage("Invalid Genre ID"),
];

module.exports = { trailer, mediaId, pageAndGenre };
