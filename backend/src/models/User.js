const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    googleId: { 
      type: String, 
      index: true, 
      sparse: true 
    },
    avatar: { 
      type: String 
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
