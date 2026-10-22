const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// 1. Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiter Middleware (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
});
app.use(limiter);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// Test Route (Exp 6)
app.get("/", (req, res) => {
  res.send("JWT Authentication API is running");
});

// Docker Verification Route (Exp 7)
app.get("/api", (req, res) => {
  res.json({
    message: "Backend is running inside Docker!",
  });
});

// 2. Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/appointments", appointmentRoutes);

// 3. Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// Port and Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
