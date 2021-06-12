const mongoose = require('mongoose');

const logs = new mongoose.Schema({
    dateTime: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    preData: {
        type: String
    },
    postData: {
        type: String
    }
})

module.exports = mongoose.model("logs", logs);