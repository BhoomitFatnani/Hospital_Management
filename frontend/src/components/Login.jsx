import { useState } from "react";
import useAuth from "../hooks/useAuth";

function Login() {
  const { login, register, isAuthenticated, user } = useAuth();

  const [mode, setMode] = useState("login"); // "login" or "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: "success" | "error", text: string }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);
    setLoading(true);

    if (mode === "login") {
      const result = await login(email, password);
      setLoading(false);

      if (result.success) {
        setFeedback({
          type: "success",
          text: `Welcome back, ${result.user.name || "User"}! Redirecting to Dashboard...`,
        });
        setTimeout(() => {
          window.location.hash = "#dashboard";
        }, 800);
      } else {
        setFeedback({
          type: "error",
          text: result.message || "Invalid email or password.",
        });
      }
    } else {
      // Register Mode
      const result = await register(name, email, password, role);
      setLoading(false);

      if (result.success) {
        setFeedback({
          type: "success",
          text: "Registration successful! You can now log in.",
        });
        // Switch to login tab and keep email
        setTimeout(() => {
          setMode("login");
        }, 1200);
      } else {
        setFeedback({
          type: "error",
          text: result.message || "Registration failed.",
        });
      }
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Already Signed In</h2>
          <p className="text-gray-600 mt-2">
            Logged in as <strong className="text-blue-600">{user?.email}</strong> ({user?.role})
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="#dashboard"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Go to Exp 6 Dashboard
            </a>
            <a
              href="#appointments"
              className="w-full bg-slate-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-slate-200 transition"
            >
              Manage Appointments
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-md w-full max-w-md border border-gray-100">
        
        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setFeedback(null);
            }}
            className={`flex-1 pb-3 text-center font-bold text-base transition border-b-2 ${
              mode === "login"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setFeedback(null);
            }}
            className={`flex-1 pb-3 text-center font-bold text-base transition border-b-2 ${
              mode === "register"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Register
          </button>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>

        <p className="text-gray-500 text-center text-sm mt-1">
          {mode === "login"
            ? "Sign in with your credentials (Exp 6 JWT)"
            : "Register as a Patient or Hospital Admin"}
        </p>

        {feedback && (
          <div
            className={`mt-5 p-3.5 rounded-lg text-sm font-medium text-center border ${
              feedback.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {feedback.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. John Doe / Jane Patient"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@hospital.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Select Role (Exp 6 RBAC)
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
              >
                <option value="user">User / Patient</option>
                <option value="admin">Admin (Full Access)</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading
              ? "Connecting to backend..."
              : mode === "login"
              ? "Sign In"
              : "Register Account"}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-100 text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
          <span>🔒</span>
          <span>Secure 256-bit encrypted authentication</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
