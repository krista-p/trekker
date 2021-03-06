
const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  startingPoint: {
    type: {
      type: String,
      enum: ['Point']
    },
    start: {
      type: [Number],
      index: '2dsphere'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Trip', TripSchema);

