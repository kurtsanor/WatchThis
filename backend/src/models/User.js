const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  displayName: String,
  email: String,
  photo: String,

  role: {
    type: String,
    enum: ['admin', 'editor', 'user'],
    default: 'user'
  }
});

module.exports = mongoose.model('User', userSchema);