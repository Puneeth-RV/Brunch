const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getOrders, updateOrderStatus, getOrderById } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getOrders);

router.route('/my').get(protect, getMyOrders);

router.route('/:id').get(protect, getOrderById);

router.route('/:id/status').put(protect, admin, updateOrderStatus);

module.exports = router;
