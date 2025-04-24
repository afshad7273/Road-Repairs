const express = require('express');
const paymentRouter = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/authMiddleware');

paymentRouter.post('/', express.raw({type:"application/json"}), protect, authorize('customer'), paymentController.handleWebhook);

paymentRouter.post('/', express.json(), protect, authorize('customer'), paymentController.createPayment);
paymentRouter.get('/:id', protect, paymentController.getPaymentById);
paymentRouter.get('/my', protect, paymentController.getMyPayments);
paymentRouter.get('/breakdown/:breakdownId', protect, paymentController.getBreakdownPayments);

module.exports = paymentRouter;