import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import useAuth from "../hooks/useAuth";
import { API_BASE_URL } from "../services/api";

const SOCKET_SERVER_URL = API_BASE_URL
  ? API_BASE_URL.replace(/\/api\/?$/, "")
  : "http://localhost:5000";

function Chat() {
  const { user, isAuthenticated } = useAuth();

  const [username, setUsername] = useState(
    isAuthenticated && user?.name ? user.name : ""
  );
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome-1",
      username: "MediCare Support Bot",
      role: "admin",
      message:
        "👋 Welcome to MediCare Live Consultation & Hospital Support! Doctors and medical assistants are online to answer your questions.",
      timestamp: "Just now",
    },
  ]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Update username if user logs in while on chat page
  useEffect(() => {
    if (isAuthenticated && user?.name) {
      setUsername(user.name);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket", "polling"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("chatMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Auto-scroll to bottom of message list
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();

    const activeUser = username.trim() || (isAuthenticated && user?.name ? user.name : "Guest Patient");
    const activeMsg = message.trim();

    if (!activeMsg) return;

    const payload = {
      username: activeUser,
      message: activeMsg,
      role: user?.role || "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    if (socketRef.current) {
      socketRef.current.emit("chatMessage", payload);
    }

    setMessage("");
  };

  const handleQuickInquiry = (text) => {
    setMessage(text);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-md flex flex-col h-[780px] overflow-hidden">
        
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">
              💬
            </div>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                MediCare Live Consultation
              </h1>
              <p className="text-xs text-blue-100">
                Real-time WebSocket chat for patients, doctors & support
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-xs font-medium border border-white/20">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                connected ? "bg-green-400 animate-pulse" : "bg-red-400"
              }`}
            ></span>
            <span>{connected ? "Online • Connected" : "Connecting..."}</span>
          </div>
        </div>

        {/* Name Bar (if not logged in) */}
        {!isAuthenticated && (
          <div className="bg-blue-50/80 px-6 py-2.5 border-b border-blue-100 flex items-center gap-3 text-xs">
            <span className="text-blue-900 font-semibold">Your Display Name:</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. John Doe (or sign in for verified badge)"
              className="bg-white border border-blue-200 px-3 py-1 rounded-lg text-gray-800 outline-none focus:border-blue-500 w-64"
            />
            <span className="text-gray-400 hidden sm:inline">
              | <a href="#login" className="text-blue-600 underline font-medium">Log in</a> to chat as a verified user
            </span>
          </div>
        )}

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          {messages.map((item, idx) => {
            const isMe =
              username.trim() &&
              item.username.toLowerCase() === username.trim().toLowerCase();

            return (
              <div
                key={item.id || idx}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-xs font-bold text-gray-700">
                    {item.username}
                  </span>
                  {item.role === "admin" && (
                    <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-1.5 py-0.2 rounded uppercase">
                      Staff / Doctor
                    </span>
                  )}
                  <span className="text-[10px] text-gray-400">
                    {item.timestamp}
                  </span>
                </div>

                <div
                  className={`max-w-md md:max-w-lg px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    isMe
                      ? "bg-blue-600 text-white rounded-br-none shadow-sm"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
                  }`}
                >
                  {item.message}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-5 py-2.5 bg-white border-t border-gray-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-gray-400 whitespace-nowrap font-medium">Quick Inquiries:</span>
          <button
            type="button"
            onClick={() => handleQuickInquiry("What are the general OPD timings today?")}
            className="bg-slate-100 hover:bg-blue-50 text-gray-600 hover:text-blue-700 px-3 py-1 rounded-full whitespace-nowrap transition border border-gray-200"
          >
            🩺 Today's OPD timings?
          </button>
          <button
            type="button"
            onClick={() => handleQuickInquiry("Can I speak with a Cardiologist specialist?")}
            className="bg-slate-100 hover:bg-blue-50 text-gray-600 hover:text-blue-700 px-3 py-1 rounded-full whitespace-nowrap transition border border-gray-200"
          >
            👨‍⚕️ Cardiologist available?
          </button>
          <button
            type="button"
            onClick={() => handleQuickInquiry("How do I cancel or reschedule my appointment?")}
            className="bg-slate-100 hover:bg-blue-50 text-gray-600 hover:text-blue-700 px-3 py-1 rounded-full whitespace-nowrap transition border border-gray-200"
          >
            📅 Reschedule appointment
          </button>
        </div>

        {/* Message Input Box */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 bg-white border-t border-gray-200 flex items-center gap-3"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your medical query or message here..."
            className="flex-1 bg-slate-50 border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white transition"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
          >
            <span>Send</span>
            <span>➤</span>
          </button>
        </form>

      </div>
    </div>
  );
}

export default Chat;
