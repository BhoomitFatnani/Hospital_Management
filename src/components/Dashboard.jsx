import { useState } from "react";
import useAuth from "../hooks/useAuth";

function Dashboard() {
  const { user, token, logout, fetchDashboard, fetchAdminData, isAuthenticated } = useAuth();

  const [dashboardResult, setDashboardResult] = useState(null);
  const [adminResult, setAdminResult] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            🔒
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Protected Page</h2>
          <p className="text-gray-600 mt-2">
            You must be logged in with a valid JWT token to access the Exp 6 Dashboard.
          </p>
          <a
            href="#login"
            className="mt-6 inline-block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  const handleTestDashboard = async () => {
    setLoadingDashboard(true);
    const res = await fetchDashboard();
    setDashboardResult(res);
    setLoadingDashboard(false);
  };

  const handleTestAdmin = async () => {
    setLoadingAdmin(true);
    const res = await fetchAdminData();
    setAdminResult(res);
    setLoadingAdmin(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="max-w-6xl mx-auto px-6 pt-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">
                Experiment 6 Dashboard
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  user?.role === "admin"
                    ? "bg-purple-100 text-purple-700 border border-purple-200"
                    : "bg-blue-100 text-blue-700 border border-blue-200"
                }`}
              >
                Role: {user?.role || "user"}
              </span>
            </div>
            <p className="text-gray-500 mt-1">
              Signed in as <strong>{user?.name || "User"}</strong> ({user?.email})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#appointments"
              className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2.5 rounded-lg font-semibold transition"
            >
              Book Appointments
            </a>
            <button
              onClick={logout}
              className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2.5 rounded-lg font-semibold transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Token Info Card */}
        <div className="mt-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
            <span>🔑</span> Active JWT Bearer Token
          </h2>
          <p className="text-xs text-gray-500 mb-3">
            Stored in <code>localStorage.getItem(&apos;hospitalToken&apos;)</code>. Passed as an HTTP header <code>Authorization: Bearer &lt;token&gt;</code>.
          </p>
          <div className="bg-slate-900 text-green-400 p-3 rounded-lg text-xs font-mono break-all max-h-24 overflow-y-auto">
            {token || "No token found"}
          </div>
        </div>

        {/* RBAC Verification Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Role-Based Access Control (RBAC) Testing
          </h2>
          <p className="text-gray-600 mb-6">
            Test backend protected endpoints against your current token and role directly from the browser:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Test 1: User / Admin Common Dashboard */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded">
                    User + Admin Route
                  </span>
                  <span className="text-xs text-gray-400 font-mono">GET /api/user/dashboard</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Protected Dashboard</h3>
                <p className="text-gray-600 text-sm mt-2">
                  Requires a valid JWT token. Permitted for all registered roles (both <code>user</code> and <code>admin</code>).
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleTestDashboard}
                  disabled={loadingDashboard}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loadingDashboard ? "Querying..." : "Send GET Request"}
                </button>

                {dashboardResult && (
                  <div className="mt-4 p-4 rounded-xl text-xs font-mono bg-slate-900 text-slate-100">
                    <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-700">
                      <span className="text-slate-400">HTTP Status:</span>
                      <span
                        className={`font-bold ${
                          dashboardResult.status === 200 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {dashboardResult.status}
                      </span>
                    </div>
                    <pre className="overflow-x-auto whitespace-pre-wrap">
                      {JSON.stringify(dashboardResult.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Test 2: Admin-Only Route */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded">
                    Admin Only Route
                  </span>
                  <span className="text-xs text-gray-400 font-mono">GET /api/user/admin</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Admin RBAC Route</h3>
                <p className="text-gray-600 text-sm mt-2">
                  Protected by <code>authorize(&quot;admin&quot;)</code>. Returns <code>200 OK</code> for admin, or <code>403 Forbidden</code> for patient/user.
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleTestAdmin}
                  disabled={loadingAdmin}
                  className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
                >
                  {loadingAdmin ? "Querying..." : "Send GET Request"}
                </button>

                {adminResult && (
                  <div className="mt-4 p-4 rounded-xl text-xs font-mono bg-slate-900 text-slate-100">
                    <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-700">
                      <span className="text-slate-400">HTTP Status:</span>
                      <span
                        className={`font-bold ${
                          adminResult.status === 200 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {adminResult.status} {adminResult.status === 403 ? "(Access Denied)" : "(Allowed)"}
                      </span>
                    </div>
                    <pre className="overflow-x-auto whitespace-pre-wrap">
                      {JSON.stringify(adminResult.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
