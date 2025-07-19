import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/users.js';
import bookingRouter from './routes/bookings.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

const prodOrigins = [process.env.ORIGIN_1, process.env.ORIGIN_2];
const devOrigin = ['http://localhost:5173'];
const allowedOrigins =
  process.env.NODE_ENV === 'production' ? prodOrigins : devOrigin;
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        console.log(origin, allowedOrigins);
        callback(null, true);
      } else {
        callback(new Error('Not allowed by cors'));
      }
    },

    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
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
