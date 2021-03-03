
const Start = require('../models/Start');

exports.addStart = async (req, res) => {
    try {
        const start = await Start.create(req.body);

        return res.status(200).json({
            success: true,
            data: start
        });
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};

exports.getStarts = async (_, res) => {
  try {
      const starts = await Start.find();

      return res.status(200).json({
          succes: true,
          count: starts.length,
          data: starts
      })
  } catch (err) {
      console.log(err);
      res.status(500);
  }
};