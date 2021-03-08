
const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  startingPoint: {
    type: {
      type: String,
      enum: ['Point']
    },
    start: {
      type: [Number],
      index: '2dsphere',
      required: true
    }
  },
  tripRoute: {
    type: {
      type: String,
      enum: ["LineString"]
    },
    points: [[Number]],
    // required: true
  },
  campsites: {
    type: {
      type: String,
      enum: ["Point"]
    },
    spots: [[Number]]
  },
  days: {
    type: "Number"
  },
  fees: {
    type: "String"
  },
  trailType: {
    type: "String"
  },
  trailDate: {
    type: "String"
  },
  description: {
    type: "String"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Trip', TripSchema);
