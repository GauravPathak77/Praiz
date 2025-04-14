
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: Number,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema);