const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');


const orderController={

// @desc    Get all purchased products for a customer
// @route   GET /api/orders/customer
// @access  Private
 getCustomerOrders : asyncHandler(async (req, res) => {
  const orders = await Order.find({ customerId: req.user._id })
    .populate('items.productId', 'productName productType productPrice image')
    .lean();

  const purchasedProducts = orders.map((order) => ({
    orderId: order._id,
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

  res.status(200).json(purchasedProducts);
}),

// @desc    Get all sold products for a workshop
// @route   GET /api/orders/workshop
// @access  Private
 getWorkshopOrders : asyncHandler(async (req, res) => {
  const orders = await Order.find({ workshop: req.user._id })
    .populate('items.productId', 'productName productType productPrice image')
    .lean();

  const soldProducts = orders.map((order) => ({
    orderId: order._id,
    customerId: order.customerId,
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
})
}

module.exports = orderController