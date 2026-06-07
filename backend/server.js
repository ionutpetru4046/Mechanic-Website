import express from 'express';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/users.js';
import bookingRouter from './routes/bookings.js';
import contactRoutes from './routes/contact.js';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Static CORS origin whitelist
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
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
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send('API is running 🟢');
});

// Connect to DB, then start server
const startServer = async () => {
  if (!MONGO_URI) {
    console.error(
      '❌ MONGO_URI (or MONGODB_URI) is not set. Add it in .env locally or in Render environment variables.',
    );
    process.exit(1);
  }

  if (!/\.mongodb\.net\/[^/?]+/.test(MONGO_URI)) {
    console.warn(
      '⚠️ MONGO_URI has no database name (defaults to "test"). Use …mongodb.net/mechanic-website?… in .env and on Render.',
    );
  }

  if (!JWT_SECRET) {
    console.error(
      '❌ JWT_SECRET is not set. Auth (login/register) will fail without it.',
    );
    process.exit(1);
  }

  try {
    await connectDB();
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

startServer();
