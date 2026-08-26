function Login() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">

          <a
            href="#"
            className="text-3xl font-bold text-blue-600"
          >
            MediCare
          </a>

          <div className="flex items-center gap-8 text-gray-600">

            <a href="#" className="hover:text-blue-600 transition">
              Home
            </a>

            <a href="#doctors" className="hover:text-blue-600 transition">
              Doctors
            </a>

            <a
              href="#appointments"
              className="hover:text-blue-600 transition"
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

      {/* Login Section */}
      <main className="min-h-[calc(100vh-85px)] flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 md:p-10">

            {/* Icon */}
            <div className="flex justify-center mb-5">

              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-3xl">
                🏥
              </div>

            </div>

            {/* Heading */}
            <div className="text-center mb-8">

              <h1 className="text-3xl font-bold text-gray-900">
                Welcome Back
              </h1>

              <p className="text-gray-600 mt-2">
                Login to your MediCare account
              </p>

            </div>

            {/* Email */}
            <div className="mb-5">

              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="block w-full h-12 px-4 border border-gray-300 rounded-lg bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* Password */}
            <div className="mb-5">

              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="block w-full h-12 px-4 border border-gray-300 rounded-lg bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* Remember + Forgot */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center mb-6">

              <label className="flex items-center gap-2 text-sm text-gray-600">

                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-600"
                />

                Remember me

              </label>

              <button className="text-sm text-blue-600 hover:underline text-left sm:text-right">
                Forgot Password?
              </button>

            </div>

            {/* Login */}
            <button
              className="w-full h-12 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Login
            </button>

            {/* Register */}
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