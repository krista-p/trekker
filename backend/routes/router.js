const express = require('express');
const router = express.Router();
const { getStarts, addStart } = require('../controllers/starts');


router
    .route('/')
    .get(getStarts)
    .post(addStart);

module.exports = router;