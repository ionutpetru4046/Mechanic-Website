/* eslint-disable no-unused-vars */
import Booking from '../models/Booking.js';

// Create a booking
export const createBooking = async (req, res) => {
  try {
    const { date, service } = req.body;

    const booking = new Booking({
      user: req.user._id,  // from protect middleware
      date,
      service,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bookings for logged-in user
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update booking by ID (only if owned by user)
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update fields from req.body
    booking.date = req.body.date || booking.date;
    booking.service = req.body.service || booking.service;
    booking.status = req.body.status || booking.status;

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete booking by ID (only if owned by user)
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await booking.remove();
    res.json({ message: 'Booking removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};