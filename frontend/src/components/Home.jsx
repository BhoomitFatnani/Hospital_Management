import useAuth from "../hooks/useAuth";

function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            {isAuthenticated && (
              <p className="text-green-600 font-semibold mb-3">
                Welcome back, {user.name} 👋
              </p>
            )}

            <p className="text-blue-600 font-bold tracking-wide uppercase text-sm">
              Healthcare Made Simple
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mt-3">
              Book Your Doctor
              <span className="text-blue-600"> Appointment </span>
              Easily
            </h1>

            <p className="text-gray-600 text-lg mt-5">
              Find qualified doctors, check their real-time availability,
              and connect with medical professionals instantly via live chat.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-7">
              <a
                href="#appointments"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                Book Appointment
              </a>
              <a
                href="#chat"
                className="bg-white border border-blue-200 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center gap-2"
              >
                <span>💬</span>
                <span>Live Doctor Chat</span>
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-10 text-center text-white shadow-lg">
            <div className="text-7xl mb-5">🏥</div>
            <h2 className="text-2xl font-bold">MediCare Health System</h2>
            <p className="text-blue-100 mt-3 max-w-sm mx-auto text-sm leading-relaxed">
              24/7 instant medical consultation, experienced specialists, and hassle-free appointment scheduling.
            </p>
            <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-2xl font-bold">6+</p>
                <p className="text-xs text-blue-200">Specialists</p>
              </div>
              <div>
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-xs text-blue-200">Live Support</p>
              </div>
              <div>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs text-blue-200">Secure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Healthcare Services</h2>
            <p className="text-gray-500 mt-2">Comprehensive patient-first medical services at your fingertips</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="#doctors"
              className="p-8 bg-slate-50 hover:bg-blue-50/50 border border-gray-100 hover:border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition duration-200 block"
            >
              <div className="text-4xl mb-4">👨‍⚕️</div>
              <h3 className="text-xl font-bold text-gray-800">Find Doctors</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Explore our certified doctors across Cardiology, Neurology, Pediatrics, and more.
              </p>
              <span className="text-blue-600 text-sm font-semibold mt-4 inline-block">
                View Medical Team →
              </span>
            </a>

            <a
              href="#appointments"
              className="p-8 bg-slate-50 hover:bg-blue-50/50 border border-gray-100 hover:border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition duration-200 block"
            >
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-gray-800">Book Appointment</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Select your preferred doctor, department, date, and time slot seamlessly.
              </p>
              <span className="text-blue-600 text-sm font-semibold mt-4 inline-block">
                Schedule Now →
              </span>
            </a>

            <a
              href="#chat"
              className="p-8 bg-slate-50 hover:bg-blue-50/50 border border-gray-100 hover:border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition duration-200 block"
            >
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-gray-800">Live Doctor Chat</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Real-time WebSocket consultation for quick medical inquiries and instant support.
              </p>
              <span className="text-blue-600 text-sm font-semibold mt-4 inline-block">
                Start Chatting →
              </span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
