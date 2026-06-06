import express from 'express';
import Booking from '../models/Booking.js';
import authenticate from '../middleware/authenticate.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

// admin routes
router.get('/admin/bookings', authenticate, isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server error fetching admin bookings',
    });
  }
});

// update admin endpoint
router.patch('/admin/bookings/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = req.body.status || booking.status;

    const updated = await booking.save();

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server error updating booking',
    });
  }
});

export default router;
