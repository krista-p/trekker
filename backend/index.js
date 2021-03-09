const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// connect to server
const app = express();
const PORT = process.env.PORT;

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// set up routes
app.use('/api', require('./routes/router'));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

// connect to mongoDB 
mongoose.connect(process.env.MDB_CONNECT, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}, (err) => {
  if (err) console.error(err);
  console.log('Connected to MongoDB!!');
});