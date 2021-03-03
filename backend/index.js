const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// connect to server
const app = express();

const PORT = process.env.PORT;

app.get('/test', (req, res) => {
  res.send('Working!! WOOHOO!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

// connect to mongoDB 
mongoose.connect(process.env.MDB_CONNECT, {useNewUrlParser:true, useUnifiedTopology: true}, (err) => {
  if (err) console.error(err);
  console.log('Connected to MongoDB!!');
});