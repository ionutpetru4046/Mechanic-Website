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
      console.log('CORS Origin:', origin);
      const allowedOrigins = [
        'http://localhost:5173', // dev frontend origin
        'https://mechanic-website-tau.vercel.app', // production frontend origin (no trailing slash)
      ];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); // allow request
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // allow cookies, authorization headers
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
