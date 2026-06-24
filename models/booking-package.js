const mongoose = require('mongoose');

const bookingPackageSchema = new mongoose.Schema({
    service: {
        type: String,
        required: [true, 'Service is required'],
        trim: true
    },
    duration: {
        type: String,
        required: [true, 'Duration is required'],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Package', bookingPackageSchema);