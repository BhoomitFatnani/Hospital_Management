function Doctors() {
  const doctors = [
    {
      name: "Dr. Rahul Sharma",
      specialization: "Cardiologist",
      experience: "12 Years Experience",
      icon: "👨‍⚕️",
    },
    {
      name: "Dr. Priya Mehta",
      specialization: "Dermatologist",
      experience: "8 Years Experience",
      icon: "👩‍⚕️",
    },
    {
      name: "Dr. Amit Patel",
      specialization: "Orthopedic",
      experience: "10 Years Experience",
      icon: "👨‍⚕️",
    },
    {
      name: "Dr. Neha Kapoor",
      specialization: "Pediatrician",
      experience: "7 Years Experience",
      icon: "👩‍⚕️",
    },
    {
      name: "Dr. Arjun Verma",
      specialization: "Neurologist",
      experience: "15 Years Experience",
      icon: "👨‍⚕️",
    },
    {
      name: "Dr. Sneha Rao",
      specialization: "Gynecologist",
      experience: "9 Years Experience",
      icon: "👩‍⚕️",
    },
  ];

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

            <a
              href="#"
              className="hover:text-blue-600 transition"
            >
              Home
            </a>

            <a
              href="#doctors"
              className="text-blue-600 font-semibold"
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
              href="#login"
              className="hover:text-blue-600 transition"
            >
              Login
            </a>

          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-8">

        <div className="text-center">

          <p className="text-blue-600 font-bold tracking-wide">
            OUR MEDICAL TEAM
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Find a Doctor
          </h1>

          <p className="text-gray-600 text-lg mt-4">
            Choose from our team of experienced healthcare professionals.
          </p>

        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mt-8">

          <input
            type="text"
            placeholder="Search doctor or specialization..."
            className="w-full h-12 px-5 bg-white border border-gray-300 rounded-xl shadow-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

      </section>

      {/* Doctors */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

          {doctors.map((doctor, index) => (

            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm hover:shadow-lg transition duration-300"
            >

              <div className="flex items-center gap-5">

                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-4xl shrink-0">
                  {doctor.icon}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {doctor.name}
                  </h2>

                  <p className="text-blue-600 font-semibold mt-1">
                    {doctor.specialization}
                  </p>
                </div>

              </div>

              <div className="mt-6 border-t border-gray-100 pt-5">

                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">
                    Experience:
                  </span>{" "}
                  {doctor.experience}
                </p>

                <p className="text-green-600 font-medium mt-2">
                  ● Available for consultation
                </p>

              </div>

              <a
                href="#appointments"
                className="block text-center w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Book Appointment
              </a>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Doctors; 