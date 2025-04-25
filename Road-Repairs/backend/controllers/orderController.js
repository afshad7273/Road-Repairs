const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const User = require('../models/userModel');


const orderController={

// @desc    Get all purchased products for a customer
// @route   GET /api/orders/customer
// @access  Private
getCustomerOrders: asyncHandler(async (req, res) => {
  console.log(req.user.id);

  const orders = await Order.find({ userId: req.user.id, paymentStatus: "completed" })
    .populate('items.productId', 'productName productType productPrice image')
    .populate('workshop', 'name') // Populate workshop details
    .lean();
  console.log(orders);

  const customerOrders = orders.flatMap((order) =>
    order.items.map((item) => ({
      id: `${order._id}-${item.productId._id}`, // Create a unique ID
      productName: item.productId.productName,
      productPrice: item.totalPrice / item.quantity, // Price per unit
      createdAt: order.createdAt,
      workshopName: order.workshop?.name || "Unknown Workshop",
    }))
  );

  res.status(200).json(customerOrders);
}),

// @desc    Get all sold products for a workshop
// @route   GET /api/orders/workshop
// @access  Private
getWorkshopOrders: asyncHandler(async (req, res) => {
  // Fetch orders and populate both product and customer details
  const orders = await Order.find({ workshop: req.user._id })
    .populate('items.productId', 'productName productType productPrice image')
    .populate('userId', 'name phone address') // Populate customer details from User model
    .lean();

  // Map orders to include customer details in the response
  const soldProducts = orders.map((order) => ({
    orderId: order._id,
    customer: order.userId, // Include populated customer details
    items: order.items.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
    })),
    totalAmount: order.totalAmount,
    paymentStatus: order.paymentStatus,
    paymentMethod: order.paymentMethod,
    createdAt: order.createdAt,
  }));

  res.status(200).json(soldProducts);
}),
}



module.exports = orderController