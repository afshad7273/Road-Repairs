const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // User who placed the order (could be customer or general user)
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // For single product orders
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        default: null, // Optional for multi-item orders
    },
    quantity: {
        type: Number,
        min: 1,
        default: null, // Optional for multi-item orders
    },
    // For multi-item orders
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            totalPrice: {
                type: Number,
                required: true,
                min: 0,
            },
        },
    ],
    // Workshop associated with the order (if applicable)
    workshop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming workshops are also users
        default: null,
    },
    // Overall amount of the order
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'cash_pending'],
        default: 'pending',
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'google_pay', 'apple_pay', 'cash'],
        required: true,
    },
    // ID from the payment gateway (e.g., Stripe charge ID, transaction ID)
    transactionId: {
        type: String,
        default: null,
    },
    // Field to store the single order amount (keeping it for consistency)
    amount: {
        type: Number,
        min: 0,
        default: null, // Will be the same as totalAmount for single product orders
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    chargeId: { type: String },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;