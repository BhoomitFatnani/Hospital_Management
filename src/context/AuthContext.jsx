/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { API_BASE_URL, getAuthHeaders } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("hospitalToken") || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("hospitalUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    document.title = "MediCare - Hospital System";
  }, []);

  // Real backend login (Exp 6 JWT)
  const login = async (email, password) => {
    if (!email || !password) {
      return { success: false, message: "Email and password are required." };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Login failed. Please check credentials.",
        };
      }

      localStorage.setItem("hospitalToken", data.token);
      localStorage.setItem("hospitalUser", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return { success: true, user: data.user };
    } catch (error) {
      console.error("Login request error:", error);
      return {
        success: false,
        message: "Network error. Is the backend server running on port 5000?",
      };
    }
  };

  // Real backend register (Exp 6 Auth)
  const register = async (name, email, password, role = "user") => {
    if (!name || !email || !password) {
      return { success: false, message: "Please fill in all required fields." };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Registration failed.",
        };
      }

      return {
        success: true,
        message: data.message || "User registered successfully! You can now log in.",
      };
    } catch (error) {
      console.error("Register request error:", error);
      return {
        success: false,
        message: "Network error. Is the backend server running on port 5000?",
      };
    }
  };

  // Fetch protected dashboard (User + Admin)
  const fetchDashboard = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/dashboard`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      return { status: response.status, data };
    } catch (error) {
      console.error("Fetch dashboard error:", error);
      return { status: 500, data: { message: "Failed to connect to backend" } };
    }
  };

  // Fetch role-protected admin route (Admin only)
  const fetchAdminData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/admin`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      return { status: response.status, data };
    } catch (error) {
      console.error("Fetch admin data error:", error);
      return { status: 500, data: { message: "Failed to connect to backend" } };
    }
  };

  const logout = () => {
    localStorage.removeItem("hospitalToken");
    localStorage.removeItem("hospitalUser");
    setToken(null);
    setUser(null);
    window.location.hash = "#home";
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout,
        fetchDashboard,
        fetchAdminData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
