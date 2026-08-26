function Appointments() {
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
              className="text-blue-600 font-semibold"
            >
              Appointments
            </a>

            <a href="#login" className="hover:text-blue-600 transition">
              Login
            </a>

          </div>

        </div>
      </nav>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-8">

        <div className="text-center">

          <p className="text-blue-600 font-bold tracking-wide">
            APPOINTMENT BOOKING
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Book Your Appointment
          </h1>

          <p className="text-gray-600 text-lg mt-4">
            Fill in the details below to schedule your appointment.
          </p>

        </div>

      </section>

      {/* Appointment Form */}
      <section className="max-w-5xl mx-auto px-6 pb-16">

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 md:p-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Patient Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Patient Name
              </label>

              <input
                type="text"
                placeholder="Enter patient name"
                className="block w-full h-12 px-4 border border-gray-300 rounded-lg bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="Enter phone number"
                className="block w-full h-12 px-4 border border-gray-300 rounded-lg bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Doctor */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Select Doctor
              </label>

              <select
                className="block w-full h-12 px-4 border border-gray-300 rounded-lg bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>Select a doctor</option>
                <option>Dr. Rahul Sharma - Cardiologist</option>
                <option>Dr. Priya Mehta - Dermatologist</option>
                <option>Dr. Amit Patel - Orthopedic</option>
                <option>Dr. Neha Kapoor - Pediatrician</option>
                <option>Dr. Arjun Verma - Neurologist</option>
                <option>Dr. Sneha Rao - Gynecologist</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Appointment Date
              </label>

              <input
                type="date"
                className="block w-full h-12 px-4 border border-gray-300 rounded-lg bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Appointment Time
              </label>

              <select
                className="block w-full h-12 px-4 border border-gray-300 rounded-lg bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>Select time</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>12:00 PM</option>
                <option>02:00 PM</option>
                <option>03:00 PM</option>
                <option>04:00 PM</option>
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Department
              </label>

              <select
                className="block w-full h-12 px-4 border border-gray-300 rounded-lg bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>Select department</option>
                <option>Cardiology</option>
                <option>Dermatology</option>
                <option>Orthopedics</option>
                <option>Pediatrics</option>
                <option>Neurology</option>
                <option>Gynecology</option>
              </select>
            </div>

          </div>

          {/* Reason */}
          <div className="mt-6">

            <label className="block text-sm font-bold text-gray-700 mb-2">
              Reason for Visit
            </label>

            <textarea
              rows="5"
              placeholder="Describe your reason for visiting..."
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            ></textarea>

          </div>

          {/* Button */}
          <button
            className="w-full mt-7 bg-blue-600 text-white py-3.5 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Confirm Appointment
          </button>

        </div>

      </section>

    </div>
  );
}

export default Appointments;