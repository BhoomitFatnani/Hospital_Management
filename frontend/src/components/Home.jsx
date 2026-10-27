import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

function Home() {
  const { user, isAuthenticated } = useAuth();
  const [dockerResponse, setDockerResponse] = useState("Connecting to backend...");

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => setDockerResponse(data.message))
      .catch(() => setDockerResponse("Backend connection failed"));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Exp 9: Containerizing Full-Stack App with Docker */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white py-4 px-6 shadow-sm border-b border-blue-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐳</span>
            <div>
              <p className="font-bold text-sm tracking-wide">
                Docker Containerized Application (Exp 9)
              </p>
              <p className="text-xs text-blue-200">
                Frontend: React/Vite (Port 5173) • Backend: Express (Port 5000)
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-lg text-xs font-medium">
              <span className="text-blue-200">Backend Response: </span>
              <span className="font-bold text-green-300 ml-1">
                {dockerResponse}
              </span>
            </div>
            <a
              href="#docker"
              className="bg-white text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm"
            >
              Inspect Container View →
            </a>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>

            {isAuthenticated && (
              <p className="text-green-600 font-semibold mb-3">
                Welcome, {user.name}
              </p>
            )}

            <p className="text-blue-600 font-bold tracking-wide">
              HEALTHCARE MADE SIMPLE
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mt-3">
              Book Your Doctor
              <span className="text-blue-600">
                {" "}Appointment{" "}
              </span>
              Easily
            </h1>

            <p className="text-gray-600 text-lg mt-5">
              Find qualified doctors, check their availability
              and book your hospital appointment online.
            </p>

            <a
              href="#appointments"
              className="inline-block mt-7 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Book Appointment
            </a>

          </div>

          <div className="bg-blue-100 rounded-2xl p-10 text-center">

            <div className="text-7xl mb-5">
              🏥
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Quality Healthcare
            </h2>

            <p className="text-gray-600 mt-3">
              Professional doctors and convenient appointment
              management.
            </p>

          </div>

        </div>

      </section>

      <section className="bg-white py-14">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center">
            Our Services
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

            <a
              href="#doctors"
              className="p-6 bg-slate-50 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">
                👨‍⚕️
              </div>

              <h3 className="text-xl font-bold">
                Find Doctors
              </h3>

              <p className="text-gray-600 mt-2">
                Search and view available doctors.
              </p>
            </a>

            <a
              href="#appointments"
              className="p-6 bg-slate-50 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">
                📅
              </div>

              <h3 className="text-xl font-bold">
                Book Appointment
              </h3>

              <p className="text-gray-600 mt-2">
                Schedule appointments easily.
              </p>
            </a>

            <div className="p-6 bg-slate-50 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">
                🔔
              </div>

              <h3 className="text-xl font-bold">
                Notifications
              </h3>

              <p className="text-gray-600 mt-2">
                Receive appointment updates.
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;
