require('dotenv').config()
const asyncHandler = require('express-async-handler');
const Payment = require('../models/paymentModel');
const Breakdown = require('../models/breakdownModel');
const User = require('../models/userModel'); // For customer and workshop validation
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 
const notificationController = require('./notificationController'); // Import notification controller

const paymentController = {
    // @desc    Create a new payment record and process payment
    // @route   POST /api/payments
    // @access  Private (Customer only)
    createPayment: asyncHandler(async (req, res) => {
        
        const { breakdownId, paymentMethod, token } = req.body;
        console.log(req.body);
        
    
        const breakdown = await Breakdown.findById(breakdownId).populate('user').populate('assignedWorkshop');
    
        if (!breakdown) {
            res.status(404);
            throw new Error('Breakdown not found');
        }
    
        if (!breakdown.assignedWorkshop) {
            res.status(400);
            throw new Error('Breakdown not assigned to a workshop');
        }
        
    
        if (breakdown.user._id.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to make payment for this breakdown');
        }
    
        let transactionId;
    
        if (paymentMethod === 'card') {
            const charge = await stripe.charges.create({
                amount: breakdown.amount * 100, // Amount in cents
                currency: 'inr', // Or your currency
                description: `Payment for breakdown ${breakdownId}`,
                source: token,
            });
            transactionId = charge.id;
        } else if (paymentMethod === 'cash') {
            // Handle COD (Cash on Delivery)
            transactionId = 'COD'; // Or generate a unique ID for COD
        } else {
            res.status(400);
            throw new Error('Invalid payment method');
        }
    
        const payment = await Payment.create({
            breakdown: breakdownId,
            customer: req.user._id,
            workshop: breakdown.assignedWorkshop._id,
            amount: breakdown.amount * 100,
            paymentMethod,
            transactionId,
            status: 'paid', // Or 'pending' if you want to confirm COD later
        });
    
        if (payment) {
            breakdown.payment = payment._id;
            breakdown.paymentStatus="paid"
            await breakdown.save();
    
            res.status(201).json(payment);
    
            await notificationController.createNotification({
                body: {
                    userId: breakdown.assignedWorkshop._id,
                    message: `Payment received for breakdown ${breakdownId}.`,
                    relatedObjectId: payment._id,
                    type: 'payment_received',
                },
            }, { status: () => ({ json: () => { } }) });
    
        } else {
            res.status(400);
            throw new Error('Payment record creation failed');
        }
    }),

    // @desc    Get payment details by ID
    // @route   GET /api/payments/:id
    // @access  Private
    getPaymentById: asyncHandler(async (req, res) => {
        const payment = await Payment.findById(req.params.id).populate('breakdown').populate('customer').populate('workshop');

        if (payment) {
            res.json(payment);
        } else {
            res.status(404);
            throw new Error('Payment not found');
        }
    }),

    // @desc    Get all payments for a user (customer or workshop)
    // @route   GET /api/payments/my
    // @access  Private
    getMyPayments: asyncHandler(async (req, res) => {
        let query = {};
        if (req.user.role === 'customer') {
            query = { customer: req.user._id };
        } else if (req.user.role === 'workshop') {
            query = { workshop: req.user._id };
        }

        const payments = await Payment.find(query).populate('breakdown').populate('customer').populate('workshop');
        res.json(payments);
    }),

    // @desc    Get all payments for a breakdown
    // @route   GET /api/payments/breakdown/:breakdownId
    // @access  Private
    getBreakdownPayments: asyncHandler(async (req, res) => {
        const payments = await Payment.find({ breakdown: req.params.breakdownId }).populate('customer').populate('workshop');
        res.json(payments);
    }),
};

module.exports = paymentController;