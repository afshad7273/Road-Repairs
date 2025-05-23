const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Customer
    workshop: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    breakdown: { type: mongoose.Schema.Types.ObjectId, ref: 'Breakdown' }, // Optional link
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;