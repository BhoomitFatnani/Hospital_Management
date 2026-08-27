import { useState } from "react";
import useAuth from "./hooks/useAuth";

function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const result = login(email, password);

    setMessage(result.message);

    if (result.success) {
      setTimeout(() => {
        window.location.hash = "";
      }, 700);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <nav className="bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">

          <a
            href="#"
            className="text-3xl font-bold text-blue-600"
          >
            MediCare
          </a>

          <div className="flex items-center gap-8 text-gray-600">

            <a href="#" className="hover:text-blue-600">
              Home
            </a>

            <a href="#doctors" className="hover:text-blue-600">
              Doctors
            </a>

            <a
              href="#appointments"
              className="hover:text-blue-600"
            >
              Appointments
            </a>

            <a
              href="#login"
              className="text-blue-600 font-semibold"
            >
              Login
            </a>

          </div>

        </div>

      </nav>

      <main className="min-h-[calc(100vh-85px)] flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 md:p-10">

            <div className="flex justify-center mb-5">

              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-3xl">
                🏥
              </div>

            </div>

            <div className="text-center mb-8">

              <h1 className="text-3xl font-bold text-gray-900">
                Welcome Back
              </h1>

              <p className="text-gray-600 mt-2">
                Login to your MediCare account
              </p>

            </div>

            {message && (
              <div className="mb-5 p-3 rounded-lg bg-blue-50 text-blue-700 text-center font-semibold">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="mb-5">

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="Enter your email"
                  className="block w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              <div className="mb-5">

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  className="block w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              <div className="flex justify-between items-center mb-6">

                <label className="flex items-center gap-2 text-sm text-gray-600">

                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-600"
                  />

                  Remember me

                </label>

                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </button>

              </div>

              <button
                type="submit"
                className="w-full h-12 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
              >
                Login
              </button>

            </form>

            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{" "}
              <button className="text-blue-600 font-bold hover:underline">
                Register
              </button>
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Login;