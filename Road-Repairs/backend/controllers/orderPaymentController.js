const asyncHandler = require('express-async-handler');
const Stripe = require('stripe');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const orderPaymentController={

// @desc    Create Stripe Checkout Session
// @route   POST /api/payments/create-checkout-session
// @access  Private
 createCheckoutSession : asyncHandler(async (req, res) => {
  const { items, paymentMethod } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('No items provided');
  }

  if (!['card', 'google_pay', 'apple_pay', 'cash'].includes(paymentMethod)) {
    res.status(400);
    throw new Error('Invalid payment method');
  }

  // Calculate total amount and verify product stock
  let totalAmount = 0;
  const productIds = items.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: productIds } });

  for (const item of items) {
    const product = products.find((p) => p._id.toString() === item.productId);
    if (!product) {
      res.status(404);
      throw new Error(`Product ${item.productId} not found`);
    }
    if (product.productCount < item.quantity) {
      res.status(400);
      throw new Error(`Insufficient stock for ${product.productName}`);
    }
    totalAmount += item.totalPrice;
  }

  // Create order
  const order = await Order.create({
    userId: req.user._id,
    workshop: products[0].workshop, // Assume all items from same workshop
    items: items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
    })),
    totalAmount,
    paymentMethod,
    paymentStatus: paymentMethod === 'cash' ? 'cash_pending' : 'pending',
  });

  if (paymentMethod === 'cash') {
    res.status(200).json({
      orderId: order._id,
      message: 'Cash payment order created',
    });
    return;
  }

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'], // Google Pay/Apple Pay included automatically
    line_items: items.map((item) => {
      const product = products.find((p) => p._id.toString() === item.productId);
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.productName,
            metadata: {
              productId: product._id.toString(),
            },
          },
          unit_amount: Math.round((item.totalPrice / item.quantity) * 100), // Per unit price in cents
        },
        quantity: item.quantity,
      };
    }),
    mode: 'payment',
    success_url: `${process.env.BASE_URL}/paynow?success=true&orderId=${order._id}`,
    cancel_url: `${process.env.BASE_URL}/paynow?success=false&orderId=${order._id}`,
    metadata: {
      orderId: order._id.toString(),
      customerId: req.user._id.toString(),
    },
    allow_promotion_codes: true,
  });

  res.status(200).json({
    sessionId: session.id,
    orderId: order._id,
  });
}),

// @desc    Handle Stripe Webhook
// @route   POST /api/payments/webhook
// @access  Public
 handleWebhook : asyncHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    res.status(400).json({ message: 'Webhook Error' });
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const orderId = session.metadata.orderId;

      const order = await Order.findById(orderId);
      if (!order) {
        console.error(`Order ${orderId} not found`);
        res.status(404).json({ message: 'Order not found' });
        return;
      }

      // Update product stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { productCount: -item.quantity },
        });
      }

      // Update order
      order.paymentStatus = 'completed';
      order.transactionId = session.payment_intent;
      await order.save();

      console.log(`Checkout completed for order ${orderId}`);
      break;
    }
    case 'checkout.session.expired': {
      const session = event.data.object;
      const orderId = session.metadata.orderId;

      const order = await Order.findById(orderId);
      if (order) {
        order.paymentStatus = 'failed';
        await order.save();
        console.log(`Checkout expired for order ${orderId}`);
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
})
}

module.exports = orderPaymentController