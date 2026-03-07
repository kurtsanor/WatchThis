const express = require("express");
const router = express.Router();
const { verifyJwt } = require("../middlewares/authMiddleware");
const upload = require("../config/multer");
const userController = require("../controllers/userController");
const uploadController = require("../controllers/uploadController");

router.post("/", userController.createUser);
router.post(
  "/avatar",
  verifyJwt,
  upload.single("file"),
  uploadController.uploadUserAvatar,
);
router.get("/:id", userController.findById);

module.exports = router;
