import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import protect from '../middleware/protect.js';

const router = express.Router();

// @route POST /api/auth/register
router.post('/register', registerUser);

// @route POST /api/auth/login
router.post('/login', loginUser);


router.get('/test', (req, res) => {
  res.send('Auth route is working!');
});

// 🛡️ Protected route example
router.get("/profile", protect, (req, res) => {
    res.json(req.user); // returns user data without password
  });


export default router;