import { useState } from "react";
import useAuth from "../hooks/useAuth";

function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(email, password);

    if (success) {
      setMessage("Login successful!");
      setEmail("");
      setPassword("");
    } else {
      setMessage("Please enter email and password.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Patient Login
        </h1>

        <p className="text-gray-600 text-center mt-2">
          Login to manage your appointments
        </p>

        <form onSubmit={handleSubmit} className="mt-8">

          <label className="block font-semibold text-gray-700 mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5"
          />

          <label className="block font-semibold text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        {message && (
          <p className="text-center text-green-600 font-semibold mt-5">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}

export default Login; 