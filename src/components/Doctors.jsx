import useDoctors from "../hooks/useDoctors";

function Doctors() {
  const {
    doctors,
    searchTerm,
    setSearchTerm,
    loading,
  } = useDoctors();

  return (
    <div className="min-h-screen bg-slate-50">

      <section className="max-w-7xl mx-auto px-6 pt-12 pb-8">

        <div className="text-center">

          <p className="text-blue-600 font-bold">
            OUR MEDICAL TEAM
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Find a Doctor
          </h1>

          <p className="text-gray-600 text-lg mt-4">
            Choose from our experienced healthcare professionals.
          </p>

        </div>

        <div className="max-w-2xl mx-auto mt-8">

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search doctor or specialization..."
            className="w-full h-12 px-5 bg-white border border-gray-300 rounded-xl shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">

        {loading ? (

          <div className="text-center py-10">

            <p className="text-blue-600 text-lg font-semibold">
              Loading doctors...
            </p>

          </div>

        ) : doctors.length === 0 ? (

          <div className="text-center py-10">

            <p className="text-gray-600 text-lg">
              No doctors found.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

            {doctors.map((doctor) => (

              <div
                key={doctor.id}
                className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm hover:shadow-lg transition duration-300"
              >

                <div className="flex items-center gap-5">

                  <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-4xl">
                    {doctor.icon}
                  </div>

                  <div>

                    <h2 className="text-xl font-bold">
                      {doctor.name}
                    </h2>

                    <p className="text-blue-600 font-semibold mt-1">
                      {doctor.specialization}
                    </p>

                  </div>

                </div>

                <div className="mt-6 border-t pt-5">

                  <p className="text-gray-600">
                    <span className="font-semibold">
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

        )}

      </section>

    </div>
  );
}

export default Doctors;