const mongoose = require('mongoose');

const tasks = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    isFinished: {
        type: Boolean
    },
    userId: {
        type: String
    },
    orderId: {
        type: String
    }
});

module.exports = mongoose.model('tasks', tasks);