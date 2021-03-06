
const mongoose = require('mongoose');
//const geoCoder = require('../utils/geocoder');

const TripSchema = new mongoose.Schema({
  startingPoint: {
    type: {
      type: String,
      enum: ['Point']
    },
    start: {
      type: [Number],
      index: '2dsphere'
    },
    //formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// Before saving, convert address to geoCode
// StartSchema.pre('save', async function(next) {
//   const loc = await geoCoder.geocode(this.address);
//   this.location = {
//       type: 'Point',
//       start: [loc[0].longitude, loc[0].latitude],
//       formattedAddress: loc[0].formattedAddress
//   };

//   // Do not save address
//   this.address = undefined;
//   next();
// });

module.exports = mongoose.model('Trip', TripSchema);

