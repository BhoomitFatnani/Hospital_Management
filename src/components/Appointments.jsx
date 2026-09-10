import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAppointment, cancelAppointment } from "../store/appointmentSlice";

const initialFormState = {
  patientName: "",
  phone: "",
  doctor: "",
  date: "",
  time: "",
  department: "",
  reason: "",
};

function Appointments() {
  const appointments = useSelector((state) => state.appointments.list);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [banner, setBanner] = useState(null);

  const todayDate = new Date().toISOString().split("T")[0];

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "patientName":
        if (!value.trim()) {
          error = "Patient name is required.";
        } else if (value.trim().length < 3) {
          error = "Patient name must be at least 3 characters.";
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = "Patient name must contain only letters and spaces.";
        }
        break;

      case "phone":
        if (!value.trim()) {
          error = "Phone number is required.";
        } else if (!/^[6-9]\d{9}$/.test(value.trim())) {
          error = "Enter a valid 10-digit phone number (starts with 6-9).";
        }
        break;

      case "doctor":
        if (!value) {
          error = "Please select a doctor.";
        }
        break;

      case "department":
        if (!value) {
          error = "Please select a department.";
        }
        break;

      case "date":
        if (!value) {
          error = "Appointment date is required.";
        } else if (value < todayDate) {
          error = "Appointment date cannot be in the past.";
        }
        break;

      case "time":
        if (!value) {
          error = "Please select an appointment time.";
        }
        break;

      case "reason":
        if (value.trim() && value.trim().length < 5) {
          error = "Reason should be at least 5 characters if provided.";
        }
        break;

      default:
        break;
    }
    return error;
  };

  const validateForm = (data) => {
    const formErrors = {};
    Object.keys(initialFormState).forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) {
        formErrors[key] = error;
      }
    });
    return formErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // If the field was already touched, perform live validation update
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }

    if (banner) {
      setBanner(null);
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setTouched({});
    setBanner(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Mark all form fields as touched on submit attempt
    const allTouched = Object.keys(initialFormState).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setBanner({
        type: "error",
        text: "Please correct the highlighted errors before submitting.",
      });
      return;
    }

    dispatch(addAppointment(formData));

    setBanner({
      type: "success",
      text: "Appointment booked successfully!",
    });

    setFormData(initialFormState);
    setErrors({});
    setTouched({});
  };

  const getInputClasses = (fieldName) =>
    `block w-full h-12 px-4 border rounded-lg outline-none transition duration-150 ${
      touched[fieldName] && errors[fieldName]
        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20"
        : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
    }`;

  const getTextareaClasses = (fieldName) =>
    `block w-full px-4 py-3 border rounded-lg resize-none outline-none transition duration-150 ${
      touched[fieldName] && errors[fieldName]
        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20"
        : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
    }`;

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-16">
        <div className="text-center mb-10">
          <p className="text-blue-600 font-bold">APPOINTMENT BOOKING</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Book Your Appointment
          </h1>
          <p className="text-gray-600 text-lg mt-4">
            Fill in the details below to schedule your appointment.
          </p>
        </div>

        {banner && (
          <div
            className={`mb-6 p-4 rounded-lg text-center font-semibold border ${
              banner.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {banner.text}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                Patient Name *
              </label>
              <input
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                placeholder="Enter patient name"
                className={getInputClasses("patientName")}
              />
              {touched.patientName && errors.patientName && (
                <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1">
                  <span>•</span> {errors.patientName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                Phone Number *
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                type="tel"
                placeholder="Enter 10-digit mobile number"
                className={getInputClasses("phone")}
              />
              {touched.phone && errors.phone && (
                <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1">
                  <span>•</span> {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                Select Doctor *
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClasses("doctor")}
              >
                <option value="">Select a doctor</option>
                <option>Dr. Rahul Sharma</option>
                <option>Dr. Priya Mehta</option>
                <option>Dr. Amit Patel</option>
                <option>Dr. Neha Kapoor</option>
                <option>Dr. Arjun Verma</option>
                <option>Dr. Sneha Rao</option>
              </select>
              {touched.doctor && errors.doctor && (
                <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1">
                  <span>•</span> {errors.doctor}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                Appointment Date *
              </label>
              <input
                name="date"
                value={formData.date}
                onChange={handleChange}
                onBlur={handleBlur}
                type="date"
                min={todayDate}
                className={getInputClasses("date")}
              />
              {touched.date && errors.date && (
                <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1">
                  <span>•</span> {errors.date}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                Appointment Time *
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClasses("time")}
              >
                <option value="">Select time</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>12:00 PM</option>
                <option>02:00 PM</option>
                <option>03:00 PM</option>
                <option>04:00 PM</option>
              </select>
              {touched.time && errors.time && (
                <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1">
                  <span>•</span> {errors.time}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClasses("department")}
              >
                <option value="">Select department</option>
                <option>Cardiology</option>
                <option>Dermatology</option>
                <option>Orthopedics</option>
                <option>Pediatrics</option>
                <option>Neurology</option>
                <option>Gynecology</option>
              </select>
              {touched.department && errors.department && (
                <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1">
                  <span>•</span> {errors.department}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Reason for Visit
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="4"
              placeholder="Describe your reason for visiting (optional)..."
              className={getTextareaClasses("reason")}
            />
            {touched.reason && errors.reason && (
              <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1">
                <span>•</span> {errors.reason}
              </p>
            )}
          </div>

          <div className="mt-7 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-sm"
            >
              Confirm Appointment
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Reset Form
            </button>
          </div>
        </form>

        {/* Appointment List */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5">Your Appointments</h2>

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
                            dispatch(cancelAppointment(appointment.id))
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