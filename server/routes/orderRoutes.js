import express from 'express';
import {
  createOrder,
  listMyOrders,
  listAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, admin, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', optionalAuth, createOrder);
router.get('/mine', protect, listMyOrders);
router.get('/', protect, admin, listAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;
