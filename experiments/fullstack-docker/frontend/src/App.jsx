import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Backend connection failed"));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "sans-serif" }}>
      <div style={{ fontSize: "50px", marginBottom: "15px" }}>🐳</div>
      <h1>Full Stack Docker Application</h1>
      <p style={{ color: "#555" }}>Frontend: React</p>
      <div
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "12px 24px",
          borderRadius: "8px",
          backgroundColor: "#e8f5e9",
          color: "#2e7d32",
          border: "1px solid #c8e6c9",
          fontWeight: "bold",
        }}
      >
        Backend Response: {message}
      </div>
    </div>
  );
}

export default App;
