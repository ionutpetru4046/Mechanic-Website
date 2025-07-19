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
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Static CORS origin whitelist
const allowedOrigins = [
  'http://localhost:5173',
  'https://mechanic-website-tau.vercel.app',
  'https://mechanic-website-1pg8qmx0s-ionutpetru4046s-projects.vercel.app',
];

// ✅ Proper CORS middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRouter);

app.get('/', (req, res) => {
  res.send('API is running 🟢');
});

// ✅ Connect to DB and start server
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
