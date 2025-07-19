import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/users.js';
import bookingRouter from './routes/bookings.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Allowed origins for production and development
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:5173',
        'https://mechanic-website-tau.vercel.app/',
      ];
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true); // allow all the requests
      } else {
        callback(new Error('not allowed by CORS')); // reject the request
      }
    },
    credentials: true, // Allow cookies to be sent
  }),
);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRouter);

app.get('/', (req, res) => {
  res.send('API is running 🟢');
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Connecting to MongoDB:', process.env.MONGO_URI);
    console.error('❌ MongoDB connection failed:', err.message);
  });
