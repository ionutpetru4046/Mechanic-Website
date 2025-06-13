import express from "express";
import Booking from "../models/Booking.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// GET all bookings for logged-in user
router.get("/", authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ date: 1 });
    res.json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching bookings" });
  }
});

// POST create new booking
router.post("/", authenticate, async (req, res) => {
  const { service, date, time, notes } = req.body;

  try {
    const booking = new Booking({
      user: req.user.id,
      service,
      date,
      time,
      notes,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating booking" });
  }
});

// PUT update booking by ID
router.put("/:id", authenticate, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
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
    res.status(500).json({ message: "Server error updating booking" });
  }
});

// DELETE booking by ID
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await booking.remove();
    res.json({ message: "Booking removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error deleting booking" });
  }
});

export default router;