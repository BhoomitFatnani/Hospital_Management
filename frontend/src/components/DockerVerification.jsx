import { useState, useEffect } from "react";

function DockerVerification() {
  const [message, setMessage] = useState("Connecting to backend...");
  const [backendUrl] = useState("http://localhost:5000/api");

  useEffect(() => {
    fetch(backendUrl)
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Backend connection failed"));
  }, [backendUrl]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="bg-white border border-gray-200 rounded-3xl p-10 md:p-14 shadow-lg max-w-lg w-full text-center">
        
        {/* Docker Logo / Container Icon */}
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">
          🐳
        </div>

        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Full Stack Docker Application
        </h1>

        <p className="text-gray-500 font-medium mt-2">
          Frontend: <span className="text-blue-600 font-semibold">React</span>
        </p>

        {/* Backend Response Badge matching Exp 7 manual Page 9 */}
        <div className="mt-8 p-4 rounded-xl border font-medium text-sm transition-all duration-300 bg-green-50 text-green-700 border-green-200 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-green-600 font-bold mb-1">
            Output 2: Live Container Communication
          </p>
          <span className="font-semibold">Backend Response: </span>
          <span className="font-bold">{message}</span>
        </div>

        {/* Container Status Breakdown */}
        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4 text-xs text-gray-500">
          <div className="bg-slate-50 p-3 rounded-lg border border-gray-100">
            <p className="font-bold text-gray-700">Frontend Container</p>
            <p className="text-blue-600 font-mono mt-0.5">3000:80 (Nginx)</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-gray-100">
            <p className="font-bold text-gray-700">Backend Container</p>
            <p className="text-blue-600 font-mono mt-0.5">5000:5000 (Node.js)</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#home"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
          >
            ← Back to MediCare Application
          </a>
        </div>

      </div>
    </div>
  );
}

export default DockerVerification;
