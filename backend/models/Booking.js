const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    service: String,
    date: Date,
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Booking', bookingSchema);
