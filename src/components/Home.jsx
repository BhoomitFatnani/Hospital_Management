import useAuth from "../hooks/useAuth";

function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">

      
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