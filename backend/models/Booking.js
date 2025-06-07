import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  date: { type: Date, required: true },
  service: { type: String, required: true },
  status: { type: String, default: 'pending' }, // optional
  // add other fields you want (e.g. notes, time, price)
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;