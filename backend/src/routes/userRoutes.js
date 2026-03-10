const express = require("express");
const router = express.Router();
const { verifyJwt } = require("../middlewares/authMiddleware");
const upload = require("../config/multer");
const userController = require("../controllers/userController");
const uploadController = require("../controllers/uploadController");
const { mongoValidator } = require("../validations");
const validate = require("../middlewares/validatorMiddleware");

router.post(
  "/avatar",
  verifyJwt,
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  uploadController.uploadUserAvatar,
);
router.get(
  "/:id",
  mongoValidator.idParam,
  validate,
  verifyJwt,
  userController.findById,
);

module.exports = router;
