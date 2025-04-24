const express = require('express');
const orderRouter = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');
const orderPaymentController = require('../controllers/orderPaymentController');

// orderRouter.post('/webhook',express.raw({type:"application/json"}), protect, orderPaymentController.handleWebhook);

orderRouter.get('/customer',express.json(), protect, orderController.getCustomerOrders);
orderRouter.get('/workshop',express.json(), protect, orderController.getWorkshopOrders);
orderRouter.post('/create-checkout',express.json(), protect, orderPaymentController.createCheckoutSession);


module.exports = orderRouter