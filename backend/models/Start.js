
const mongoose = require('mongoose');

const StartSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, 'Please add a starting address']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Start', StartSchema);