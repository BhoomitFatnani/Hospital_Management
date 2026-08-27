import { useEffect, useState } from "react";

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("hospitalUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    if (!email || !password) {
      return {
        success: false,
        message: "Please enter email and password",
      };
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

    return {
      success: true,
      message: "Login successful",
    };
  };

  const logout = () => {
    localStorage.removeItem("hospitalUser");
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };
}

export default useAuth;