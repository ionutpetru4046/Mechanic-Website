import express from 'express';
import {
  createBooking,
  getMyBookings,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingControllers.js';
import protect from '../middleware/protect.js';

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, getMyBookings);

router.route('/:id')
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);

export default router;