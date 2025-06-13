/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/users.js";
import bookingRouter from "./routes/bookings.js"
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();  
app.use(express.json());
app.use(cors())  // for parsing JSON bodies

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Routes
app.use("/api/auth", authRoutes);

// users api
app.use("/api/users", userRoutes);

// booking routes
app.use("/api/bookings", bookingRouter);

// Test route to check server is working
app.get("/", (req, res) => {
  res.send("API is running 🟢");
});

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
