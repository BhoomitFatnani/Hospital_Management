import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("hospitalUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // useEffect: runs after the component is rendered
// useEffect runs after the component is rendered
useEffect(() => {
  document.title = "MediCare";
  console.log("AuthProvider loaded");
}, []);

  const login = (email, password) => {
    if (!email || !password) {
      return false;
    }

    const loggedInUser = {
      name: "Hospital Patient",
      email: email,
      role: "Patient",
    };

    localStorage.setItem(
      "hospitalUser",
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return true;
  };

  const logout = () => {
    localStorage.removeItem("hospitalUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
  value={{
    user,
    isAuthenticated: !!user,
    login,
    logout,
  }}
>
      {children}
    </AuthContext.Provider>
  );
}