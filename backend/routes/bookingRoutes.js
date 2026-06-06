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

// GET all bookings for the logged-in user
router.get('/booking', authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({
      date: 1,
    });
    res.json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching bookings' });
  }
});

// POST create a new booking
router.post('/booking', authenticate, async (req, res) => {
  const { service, date, time, notes } = req.body;

  try {
    const booking = new Booking({
      user: req.user.id,
      service,
      date,
      time,
      notes,
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating booking' });
  }
});

// PUT update booking by ID
router.put('/booking/:id', authenticate, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update only provided fields
    booking.service = req.body.service || booking.service;
    booking.date = req.body.date || booking.date;
    booking.time = req.body.time || booking.time;
    booking.notes = req.body.notes || booking.notes;

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating booking' });
  }
});

// DELETE booking by ID
router.delete('/booking/:id', authenticate, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await booking.deleteOne();
    res.json({ message: 'Booking removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting booking' });
  }
});

export default router;
