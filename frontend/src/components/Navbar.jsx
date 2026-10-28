import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout, isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <a
          href="#home"
          className="text-2xl font-bold text-blue-600 flex items-center gap-2"
        >
          <span>🏥</span>
          <span>MediCare</span>
        </a>

        <div className="flex items-center gap-6 text-gray-600 font-medium text-sm sm:text-base">

          <a
            href="#home"
            className="hover:text-blue-600 transition"
          >
            Home
          </a>

          <a
            href="#doctors"
            className="hover:text-blue-600 transition"
          >
            Doctors
          </a>

          <a
            href="#appointments"
            className="hover:text-blue-600 transition"
          >
            Appointments
          </a>

          <a
            href="#chat"
            className="hover:text-blue-600 transition flex items-center gap-1.5 font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg"
          >
            <span>💬</span>
            <span>Live Chat</span>
          </a>

          {isAuthenticated && (
            <a
              href="#dashboard"
              className="hover:text-blue-600 transition flex items-center gap-1.5"
            >
              <span>Dashboard</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                  user?.role === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {user?.role || "user"}
              </span>
            </a>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
              <span className="text-xs text-gray-500 hidden sm:inline font-semibold">
                {user?.name?.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-700 text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <a
              href="#login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
            >
              Login / Register
            </a>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
