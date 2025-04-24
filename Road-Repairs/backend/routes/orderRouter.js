const express = require('express');
const orderRouter = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');
const orderPaymentController = require('../controllers/orderPaymentController');

orderRouter.post('/webhook',express.raw({type:"application/json"}), orderPaymentController.handleWebhook);

orderRouter.get('/customer', protect, orderController.getCustomerOrders);
orderRouter.get('/workshop', protect, orderController.getWorkshopOrders);
orderRouter.post('/create-checkout',express.json(), protect, orderPaymentController.createCheckoutSession);


module.exports = orderRouter