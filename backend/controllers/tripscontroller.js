
const Trip = require('../models/Trip');

exports.addTrip = async (req, res) => {
    try {
        const trip = await Trip.create(req.body);

        return res.status(200).json({
            success: true,
            data: trip
        });
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};

exports.getTrips = async (_, res) => {
  try {
      const trips = await Trip.find();

      return res.status(200).json({
          succes: true,
          count: trips.length,
          data: trips
      })
  } catch (err) {
      console.log(err);
      res.status(500);
  }
};