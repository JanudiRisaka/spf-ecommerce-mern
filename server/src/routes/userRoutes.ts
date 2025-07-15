import express from 'express';
import { getUsers, deleteUser } from '../controllers/userController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// All routes in this file will first go through the 'protect' middleware,
// then the 'admin' middleware.
router.use(protect, admin);

// Define the routes
router.route('/').get(getUsers);
router.route('/:id').delete(deleteUser);

export default router;