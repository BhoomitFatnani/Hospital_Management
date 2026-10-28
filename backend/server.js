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

// Intelligent Automated Assistant Reply Generator
function getAutomatedReply(userText) {
  const lower = (userText || "").toLowerCase();

  if (lower.includes("opd") || lower.includes("timing") || lower.includes("time") || lower.includes("hour")) {
    return "🕒 MediCare OPD hours are Monday to Saturday from 9:00 AM to 8:00 PM. Emergency and ambulance services are active 24/7.";
  }
  if (lower.includes("cardio") || lower.includes("heart")) {
    return "👨‍⚕️ Dr. Rahul Sharma (Cardiologist, 12 years experience) is on duty today. You can book a direct consultation in the Appointments tab.";
  }
  if (lower.includes("doctor") || lower.includes("specialist") || lower.includes("team")) {
    return "🏥 We have 6 specialist departments on duty: Cardiology (Dr. Rahul Sharma), Dermatology (Dr. Priya Mehta), Orthopedics (Dr. Amit Patel), Pediatrics (Dr. Neha Kapoor), Neurology (Dr. Arjun Verma), and Gynecology (Dr. Sneha Rao).";
  }
  if (lower.includes("appointment") || lower.includes("book") || lower.includes("reschedule") || lower.includes("cancel")) {
    return "📅 To schedule, view, or cancel your bookings, click 'Appointments' or check your personal 'Dashboard' in the navigation bar.";
  }
  if (lower.includes("emergency") || lower.includes("ambulance") || lower.includes("urgent")) {
    return "🚨 For immediate emergency assistance, please call our 24/7 hospital helpline at 1800-MEDICARE or 108 directly.";
  }
  if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) {
    return "👋 Hello! I am the MediCare Virtual Assistant. Our on-duty medical staff has also received your message. How can we help you today?";
  }
  return "Thank you for contacting MediCare Hospital. Your message has been logged for our on-duty healthcare team. We will attend to your request shortly!";
}

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

    // Broadcast user's message to everyone
    io.emit("chatMessage", enrichedMessage);

    // If sent by a regular user/patient, trigger automated hospital assistant response after 1 sec
    if (data.role !== "admin" && data.username !== "MediCare Medical Assistant") {
      setTimeout(() => {
        const botReply = {
          id: Date.now() + "_bot",
          username: "MediCare Medical Assistant",
          message: getAutomatedReply(data.message),
          role: "admin",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        io.emit("chatMessage", botReply);
      }, 1000);
    }
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
