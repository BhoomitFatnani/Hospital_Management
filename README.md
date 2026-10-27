# MediCare - Hospital Management System

A full-stack hospital management web application featuring doctor discovery, appointment booking, JWT-based authentication with Role-Based Access Control (RBAC), containerized multi-service deployment with Docker, and full coursework experiment modules.

---

## 📁 Project Architecture

```
hospital-appointment/
├── backend/                       # Node.js + Express + MongoDB REST API (Main System)
│   ├── controllers/               # Request handlers & validation logic
│   ├── middleware/                # Auth (JWT) & error handling middleware
│   ├── models/                    # Mongoose schemas (User, Appointment)
│   ├── routes/                    # API routes (/api/auth, /api/user, /api/appointments)
│   ├── server.js                  # Express entry point
│   ├── Dockerfile                 # Backend container configuration
│   ├── package.json               # Backend dependencies
│   └── .env.example               # Environment variables template
├── frontend/                      # React 19 + Vite + Tailwind CSS + Redux Toolkit (Main System)
│   ├── public/                    # Static assets & icons
│   ├── src/
│   │   ├── components/            # UI Components (Navbar, Home, Doctors, Appointments, Login, Dashboard, DockerVerification)
│   │   ├── context/               # AuthContext (JWT & user state)
│   │   ├── hooks/                 # Custom React hooks (useAuth, useDoctors, useAppointments)
│   │   ├── services/              # API client & headers configuration
│   │   ├── store/                 # Redux Toolkit store & appointmentSlice
│   │   ├── App.jsx                # Client-side hash router
│   │   └── main.jsx               # App root mount with Providers
│   ├── Dockerfile                 # Multi-stage production build (Node -> Nginx)
│   ├── package.json               # Frontend dependencies
│   └── vite.config.js             # Vite configuration
├── experiments/                   # Standalone Full-Stack Lab Experiments
│   ├── secure-rest-api/           # Exp 6: Secure REST API (JWT, RBAC, Helmet, Rate Limiter)
│   ├── websocket-chat/            # Exp 7: Real-Time Chat (Socket.IO + React)
│   └── fullstack-docker/          # Exp 8: Multi-Container Docker Application
└── compose.yaml                   # Multi-container Docker Compose orchestration
```

---

## 🚀 Running the Project Locally

### 1. Backend Setup
```bash
cd backend
npm install
# Configure .env with your MONGO_URI, PORT, and JWT_SECRET
npm run dev
```
Backend runs on `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

---

## 🧪 Running the Standalone Experiments

- **Experiment 6 (Secure REST API)**:
  ```bash
  cd experiments/secure-rest-api
  npm install
  npm run dev
  ```
- **Experiment 7 (WebSocket Chat)**:
  ```bash
  # Backend
  cd experiments/websocket-chat/backend && npm install && npm start
  # Frontend
  cd experiments/websocket-chat/frontend && npm install && npm run dev
  ```
- **Experiment 8 (Fullstack Docker)**:
  ```bash
  cd experiments/fullstack-docker
  docker compose up --build
  ```

---

## 🐳 Running MediCare with Docker

Run both frontend and backend containers together from the project root:
```bash
docker compose up --build
```
- Frontend: `http://localhost:3000` (served via Nginx)
- Backend: `http://localhost:5000` (Node.js API)
