import express from 'express';
import protect from '../middleware/protect.js';
import {
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';

const router = express.Router();

// GET /api/users/profile
router.get('/profile', protect, getUserProfile);
// PUT /api/users/profile
router.put('/profile', protect, updateUserProfile);

export default router;
