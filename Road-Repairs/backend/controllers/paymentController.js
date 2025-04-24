const asyncHandler = require('express-async-handler');
const Breakdown = require('../models/breakdownModel');
const Payment = require('../models/paymentModel');
require("dotenv").config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const notificationController = require('./notificationController'); // Assuming you have this
const User = require('../models/userModel');

const paymentController = {
    createPayment: asyncHandler(async (req, res) => {
        const { breakdownId, paymentMethod, token } = req.body;
        console.log('createPayment body:', req.body);

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

        if (paymentMethod === 'card') {
            try {
                const charge = await stripe.charges.create({
                    amount: breakdown.amount * 100, // Amount in cents
                    currency: 'inr', // Or your currency
                    description: `Payment for breakdown ${breakdownId}`,
                    source: token,
                    metadata: {
                        breakdownId: breakdownId.toString(),
                        customerId: req.user._id.toString(),
                        workshopId: breakdown.assignedWorkshop._id.toString(), 
                    }, // Include metadata for webhook
                });

                // Respond immediately that the payment intent was created successfully
                res.status(200).json({ message: 'Payment initiated successfully', chargeId: charge.id });

                // The actual payment verification and record creation will be handled in the webhook
                return;

            } catch (error) {
                console.error('Error creating charge:', error);
                res.status(400);
                throw new Error(`Stripe charge creation failed: ${error.message}`);
            }
        } else if (paymentMethod === 'cash') {
            // Handle COD immediately
            const payment = await Payment.create({
                breakdown: breakdownId,
                customer: req.user._id,
                workshop: breakdown.assignedWorkshop._id,
                amount: breakdown.amount * 100,
                paymentMethod,
                transactionId: 'COD', // Or generate a unique ID for COD
                status: 'pending', // Status will be updated later
            });

            if (payment) {
                breakdown.payment = payment._id;
                breakdown.paymentStatus = 'pending';
                await breakdown.save();

                await notificationController.createNotification({
                    body: {
                        userId: breakdown.assignedWorkshop._id,
                        message: `COD initiated for breakdown ${breakdownId}.`,
                        relatedObjectId: payment._id,
                        type: 'cod_initiated',
                    },
                }, { status: () => ({ json: () => { } }) });

                res.status(201).json(payment);
            } else {
                res.status(400);
                throw new Error('Payment record creation failed for COD');
            }
        } else {
            res.status(400);
            throw new Error('Invalid payment method');
        }
    }),

    handleWebhook: asyncHandler(async (req, res) => {
        const sig = req.headers['stripe-signature'];
        let event;
        

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_PAYMENT_WEBHOOK_SECRET);
        } catch (err) {
            console.error(`Webhook Error: ${err.message}`);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (event.type === 'charge.succeeded') {
            const charge = event.data.object;
            const { breakdownId, customerId, workshopId } = charge.metadata;
            const transactionId = charge.id;
            const amount = charge.amount;
            const currency = charge.currency;

            console.log('Webhook received charge.succeeded for:', charge.id);

            const breakdown = await Breakdown.findById(breakdownId);
            const customer = await User.findById(customerId); // Assuming you have a User model
            const workshop = await User.findById(workshopId); // Assuming you have a User model for workshops

            if (!breakdown || !customer || !workshop) {
                console.error('Breakdown, customer, or workshop not found for webhook event:', breakdownId, customerId, workshopId);
                return res.status(400).send('Breakdown, customer, or workshop not found');
            }

            // Create the payment record
            const payment = await Payment.create({
                breakdown: breakdownId,
                customer: customerId,
                workshop: workshopId,
                amount: amount,
                paymentMethod: 'card',
                transactionId: transactionId,
                status: 'paid',
            });

            if (payment) {
                breakdown.payment = payment._id;
                breakdown.paymentStatus = 'paid';
                await breakdown.save();

                await notificationController.createNotification({
                    body: {
                        userId: workshopId,
                        message: `Payment received for breakdown ${breakdownId} (Transaction ID: ${transactionId}).`,
                        relatedObjectId: payment._id,
                        type: 'payment_received',
                    },
                }, { status: () => ({ json: () => { } }) });

                console.log('Payment record created successfully:', payment._id);
            } else {
                console.error('Payment record creation failed after successful charge:', charge.id);
            }
        } else if (event.type === 'charge.failed') {
            const charge = event.data.object;
            const { breakdownId } = charge.metadata;
            console.error(`Charge failed for breakdown ${breakdownId}:`, charge.failure_message);

            const breakdown = await Breakdown.findById(breakdownId);
            if (breakdown) {
                breakdown.paymentStatus = 'failed';
                await breakdown.save();

                await notificationController.createNotification({
                    body: {
                        userId: breakdown.user._id, // Notify the customer
                        message: `Payment failed for breakdown ${breakdownId}: ${charge.failure_message}`,
                        relatedObjectId: breakdown._id,
                        type: 'payment_failed',
                    },
                }, { status: () => ({ json: () => { } }) });
            }
        }

        // Return a 200 response to acknowledge receipt of the event
        res.sendStatus(200);
    }),

    getPaymentById: asyncHandler(async (req, res) => {
        const payment = await Payment.findById(req.params.id)
            .populate('breakdown', 'description amount')
            .populate('customer', 'name email')
            .populate('workshop', 'name email');
        if (!payment) {
            res.status(404);
            throw new Error('Payment not found');
        }
        res.json(payment);
    }),

    getMyPayments: asyncHandler(async (req, res) => {
        const payments = await Payment.find({ customer: req.user._id })
            .populate('breakdown', 'description amount')
            .populate('workshop', 'name email')
            .sort({ createdAt: -1 });
        res.json(payments);
    }),

    getBreakdownPayments: asyncHandler(async (req, res) => {
        const payments = await Payment.find({ breakdown: req.params.breakdownId })
            .populate('customer', 'name email')
            .populate('workshop', 'name email')
            .sort({ createdAt: -1 });
        res.json(payments);
    }),
};

module.exports = paymentController;