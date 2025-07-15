import express from 'express';
import { getOrders, updateOrderStatus } from '../controllers/orderController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Apply protect and admin middleware to all routes in this file
router.use(protect, admin);

// --- Define the routes ---

// GET /api/v1/orders - Fetches all orders
router.route('/').get(getOrders);

// PUT /api/v1/orders/:id/status - Updates the status of a specific order
router.route('/:id/status').put(updateOrderStatus);

export default router;