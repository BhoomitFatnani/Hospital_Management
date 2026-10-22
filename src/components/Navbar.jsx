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
          <span>MediCare</span>
        </a>

        <div className="flex items-center gap-6 text-gray-600 font-medium">

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
            <div className="flex items-center gap-4 pl-2 border-l border-gray-200">
              <span className="text-xs text-gray-400 hidden sm:inline">
                {user?.name?.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-700 text-sm transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <a
              href="#login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
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
