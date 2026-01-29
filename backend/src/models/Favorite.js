const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Must match User model name
      required: [true, "User id is required"],
    },
    mediaId: {
      type: Number,
      required: [true, "Media id is required"],
    },
    mediaType: {
      type: String,
      required: [true, "Media type is required"],
    },
  },
  {
    timestamps: true,
  },
);

favoriteSchema.index({ userId: 1, mediaId: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
