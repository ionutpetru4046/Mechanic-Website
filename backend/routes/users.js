import express from 'express';
import protect from '../middleware/protect.js';
import { getUserProfile } from '../controllers/userController.js';

const router = express.Router();

// GET /api/users/profile
router.get('/profile', protect, getUserProfile);

export default router;
