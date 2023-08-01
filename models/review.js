const mongoose = require('mongoose');

// The review schema contain the content of review and the reviewer and reviewed

const reviewSchema = new mongoose.Schema({
    content: {
        type: 'String',
        require: true
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;