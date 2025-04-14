
const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Doubt', doubtSchema);

