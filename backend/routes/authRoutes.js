import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// @route POST /api/auth/register
router.post('/register', registerUser);

// @route POST /api/auth/login
router.post('/login', loginUser);

router.get('/test', (req, res) => {
  res.send('Auth route is working!');
});

export default router;
