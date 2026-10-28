import { useSelector, useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
import { cancelAppointmentApi } from "../store/appointmentSlice";

function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const appointments = useSelector((state) => state.appointments.list);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            🔒
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Sign In Required</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Please log in to your MediCare account to access your patient dashboard and appointments.
          </p>
          <a
            href="#login"
            className="mt-6 inline-block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  const confirmedCount = appointments.filter(
    (a) => a.status === "Confirmed"
  ).length;

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      dispatch(cancelAppointmentApi(id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="max-w-6xl mx-auto px-6 pt-10">
        
        {/* Profile Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Welcome, {user?.name || "Patient"}!
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    user?.role === "admin"
                      ? "bg-purple-100 text-purple-700 border border-purple-200"
                      : "bg-blue-100 text-blue-700 border border-blue-200"
                  }`}
                >
                  {user?.role === "admin" ? "Hospital Doctor / Admin" : "Registered Patient"}
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Account Email: <strong className="text-gray-700">{user?.email}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="#appointments"
              className="flex-1 md:flex-initial text-center bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition shadow-sm text-sm"
            >
              + Book Appointment
            </a>
            <button
              onClick={logout}
              className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-4 py-2.5 rounded-xl font-semibold transition text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 font-semibold uppercase">Total Bookings</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{appointments.length}</p>
            <p className="text-xs text-blue-600 mt-1">On your records</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 font-semibold uppercase">Confirmed Visits</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{confirmedCount}</p>
            <p className="text-xs text-green-600 mt-1">Ready for consultation</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 font-semibold uppercase">Specialists</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">6</p>
            <p className="text-xs text-gray-400 mt-1">Across 6 departments</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 font-semibold uppercase">Live Support</p>
            <p className="text-3xl font-bold text-indigo-600 mt-2">24/7</p>
            <a href="#chat" className="text-xs text-indigo-600 underline font-medium mt-1 inline-block">
              Open Live Chat →
            </a>
          </div>
        </div>

        {/* Quick Access Links */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <a
            href="#chat"
            className="p-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-sm hover:shadow-md transition flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-lg">💬 Live Doctor Consultation</p>
              <p className="text-xs text-blue-100 mt-1">Chat in real-time with available medical staff</p>
            </div>
            <span className="text-2xl">→</span>
          </a>

          <a
            href="#appointments"
            className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-gray-800 text-lg">📅 Schedule Appointment</p>
              <p className="text-xs text-gray-500 mt-1">Choose date, time, and specialist doctor</p>
            </div>
            <span className="text-2xl text-gray-400">→</span>
          </a>

          <a
            href="#doctors"
            className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-gray-800 text-lg">👨‍⚕️ Find Specialists</p>
              <p className="text-xs text-gray-500 mt-1">Search medical staff and specializations</p>
            </div>
            <span className="text-2xl text-gray-400">→</span>
          </a>
        </div>

        {/* Scheduled Appointments Section */}
        <div className="mt-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Scheduled Appointments
              </h2>
              <p className="text-gray-500 text-xs mt-1">
                Active appointments and historical consultation records
              </p>
            </div>
            <a
              href="#appointments"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Book New +
            </a>
          </div>

          {appointments.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl">
              <span className="text-4xl">📅</span>
              <p className="text-gray-600 font-semibold mt-3">No appointments booked yet</p>
              <p className="text-gray-400 text-xs mt-1">Book your first doctor appointment online in seconds.</p>
              <a
                href="#appointments"
                className="inline-block mt-4 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Schedule Appointment
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {appointments.map((appt) => {
                const targetId = appt._id || appt.id;
                const isConfirmed = appt.status === "Confirmed";

                return (
                  <div
                    key={targetId}
                    className="p-5 rounded-2xl border border-gray-200 bg-slate-50/50 hover:bg-slate-50 transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            isConfirmed
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {appt.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          {appt.date} • {appt.time}
                        </span>
                      </div>

                      <h3 className="font-bold text-gray-800 text-base mt-3">
                        {appt.doctor}
                      </h3>
                      <p className="text-xs text-blue-600 font-medium">
                        {appt.department}
                      </p>

                      <div className="mt-3 pt-3 border-t border-gray-200/60 text-xs text-gray-600 space-y-1">
                        <p>
                          <span className="text-gray-400">Patient:</span>{" "}
                          <strong>{appt.patientName}</strong> ({appt.phone})
                        </p>
                        {appt.reason && (
                          <p>
                            <span className="text-gray-400">Reason:</span> {appt.reason}
                          </p>
                        )}
                      </div>
                    </div>

                    {isConfirmed && (
                      <div className="mt-4 pt-3 border-t border-gray-200/60 flex justify-end">
                        <button
                          onClick={() => handleCancel(targetId)}
                          className="text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
