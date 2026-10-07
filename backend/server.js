const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 1. Import Routes
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("Full Stack API is Running");
});

// 2. Mount Routes
app.use("/api/appointments", appointmentRoutes);

// Port and Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});