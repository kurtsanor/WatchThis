const { param, query } = require("express-validator");

const idParam = [param("id").isMongoId().withMessage("Invalid ID")];

module.exports = { idParam };
