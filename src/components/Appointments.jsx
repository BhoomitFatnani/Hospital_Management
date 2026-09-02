import { useState } from "react";
import useAppointments from "../hooks/useAppointments";

function Appointments() {
  const {
    appointments,
    addAppointment,
    cancelAppointment,
  } = useAppointments();

  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    doctor: "",
    date: "",
    time: "",
    department: "",
    reason: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.patientName ||
      !formData.phone ||
      !formData.doctor ||
      !formData.date ||
      !formData.time ||
      !formData.department
    ) {
      setMessage("Please fill all required fields.");
      return;
    }

    addAppointment(formData);

    setMessage("Appointment booked successfully!");

    setFormData({
      patientName: "",
      phone: "",
      doctor: "",
      date: "",
      time: "",
      department: "",
      reason: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">


      <section className="max-w-5xl mx-auto px-6 pt-12 pb-16">

        <div className="text-center mb-10">

          <p className="text-blue-600 font-bold">
            APPOINTMENT BOOKING
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Book Your Appointment
          </h1>

          <p className="text-gray-600 text-lg mt-4">
            Fill in the details below to schedule your appointment.
          </p>

        </div>

        {message && (
          <div className="mb-6 p-4 rounded-lg bg-blue-50 text-blue-700 font-semibold text-center">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 md:p-10"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-bold mb-2">
                Patient Name *
              </label>

              <input
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                type="text"
                placeholder="Enter patient name"
                className="block w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Phone Number *
              </label>

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Enter phone number"
                className="block w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Select Doctor *
              </label>

              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="block w-full h-12 px-4 border border-gray-300 rounded-lg bg-white outline-none focus:border-blue-500"
              >
                <option value="">Select a doctor</option>
                <option>Dr. Rahul Sharma</option>
                <option>Dr. Priya Mehta</option>
                <option>Dr. Amit Patel</option>
                <option>Dr. Neha Kapoor</option>
                <option>Dr. Arjun Verma</option>
                <option>Dr. Sneha Rao</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Appointment Date *
              </label>

              <input
                name="date"
                value={formData.date}
                onChange={handleChange}
                type="date"
                className="block w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Appointment Time *
              </label>

              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="block w-full h-12 px-4 border border-gray-300 rounded-lg bg-white outline-none focus:border-blue-500"
              >
                <option value="">Select time</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>12:00 PM</option>
                <option>02:00 PM</option>
                <option>03:00 PM</option>
                <option>04:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Department *
              </label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="block w-full h-12 px-4 border border-gray-300 rounded-lg bg-white outline-none focus:border-blue-500"
              >
                <option value="">Select department</option>
                <option>Cardiology</option>
                <option>Dermatology</option>
                <option>Orthopedics</option>
                <option>Pediatrics</option>
                <option>Neurology</option>
                <option>Gynecology</option>
              </select>
            </div>

          </div>

          <div className="mt-6">

            <label className="block text-sm font-bold mb-2">
              Reason for Visit
            </label>

            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="5"
              placeholder="Describe your reason for visiting..."
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg resize-none outline-none focus:border-blue-500"
            />

          </div>

          <button
            type="submit"
            className="w-full mt-7 bg-blue-600 text-white py-3.5 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Confirm Appointment
          </button>

        </form>

        {/* Appointment List */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-5">
            Your Appointments
          </h2>

          {appointments.length === 0 ? (

            <div className="bg-white border rounded-xl p-6 text-gray-500 text-center">
              No appointments booked yet.
            </div>

          ) : (

            <div className="space-y-4">

              {appointments.map((appointment) => (

                <div
                  key={appointment.id}
                  className="bg-white border rounded-xl p-5 shadow-sm"
                >

                  <div className="flex flex-col md:flex-row justify-between gap-4">

                    <div>

                      <h3 className="text-lg font-bold">
                        {appointment.doctor}
                      </h3>

                      <p className="text-gray-600 mt-1">
                        Patient: {appointment.patientName}
                      </p>

                      <p className="text-gray-600">
                        {appointment.date} at {appointment.time}
                      </p>

                      <p className="text-gray-600">
                        Department: {appointment.department}
                      </p>

                    </div>

                    <div className="flex flex-col items-start md:items-end gap-3">

                      <span
                        className={
                          appointment.status === "Confirmed"
                            ? "px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold"
                            : "px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold"
                        }
                      >
                        {appointment.status}
                      </span>

                      {appointment.status === "Confirmed" && (
                        <button
                          onClick={() =>
                            cancelAppointment(appointment.id)
                          }
                          className="text-red-600 font-semibold hover:underline"
                        >
                          Cancel Appointment
                        </button>
                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default Appointments;