import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    service: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    notes: { type: String },
  },
  { timestamps: true },
);

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;
