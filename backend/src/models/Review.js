const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    mediaId: {
      type: Number,
      required: [true, "Media id is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      max: [5, "Rating cannot be above 5"],
      min: [1, "Rating cannot be below 1"],
    },
    reviewText: {
      type: String,
      required: [true, "Review is required"],
    },
  },
  {
    timestamps: true,
  },
);

reviewSchema.index({ userId: 1, mediaId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
