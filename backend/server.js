const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
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
const server = http.createServer(app);

// Initialize Socket.IO for real-time WebSocket communication
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected to WebSocket:", socket.id);

  socket.on("chatMessage", (data) => {
    const enrichedMessage = {
      id: Date.now() + Math.random().toString(36).substring(2, 7),
      username: data.username || "Anonymous Patient",
      message: data.message,
      role: data.role || "user",
      timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    io.emit("chatMessage", enrichedMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected from WebSocket:", socket.id);
  });
});

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

// Health Check Route
app.get("/", (req, res) => {
  res.send("MediCare Hospital API is running");
});

app.get("/api", (req, res) => {
  res.json({
    status: "healthy",
    message: "MediCare Hospital API and WebSocket Server are active!",
  });
});

// 2. Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/appointments", appointmentRoutes);

// 3. Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// Port and Listen using http server (supporting both REST and WebSockets)
const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
