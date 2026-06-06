// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Return JWT
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Register error:', error);

    if (error.code === 11000) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (
      error.name === 'ValidationError' ||
      error.code === 8000 ||
      error.message?.includes('not allowed to do action') ||
      error.message?.includes('not authorized')
    ) {
      return res.status(503).json({
        message:
          'Database cannot save new users. In MongoDB Atlas: add read/write access for your DB user, and set MONGO_URI to include a database name (e.g. …/mechanic-website?…).',
      });
    }

    if (error.message?.includes('secretOrPrivateKey')) {
      return res.status(500).json({
        message: 'Server misconfigured: JWT_SECRET is missing on the backend.',
      });
    }

    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);

    if (error.message?.includes('secretOrPrivateKey')) {
      return res.status(500).json({
        message: 'Server misconfigured: JWT_SECRET is missing on the backend.',
      });
    }

    res.status(500).json({ message: 'Server error' });
  }
};

export { registerUser, loginUser };
