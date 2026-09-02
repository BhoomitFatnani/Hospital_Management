import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <a
          href="#home"
          className="text-3xl font-bold text-blue-600"
        >
          MediCare
        </a>

        <div className="flex items-center gap-8 text-gray-600">

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

          {user ? (
            <button
              onClick={logout}
              className="hover:text-blue-600 transition"
            >
              Logout
            </button>
          ) : (
            <a
              href="#login"
              className="hover:text-blue-600 transition"
            >
              Login
            </a>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;