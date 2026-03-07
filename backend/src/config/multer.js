const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    const allowed = ["image/jpeg", "image/png"];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Only image files are allowed."));
  },
});

module.exports = upload;
