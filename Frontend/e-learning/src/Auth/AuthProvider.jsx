import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
  user: null,
  handleLogin: (token) => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = (token) => {
    const decodedUser = jwtDecode(token);

    const formattedUser = {
      id: decodedUser.sub || decodedUser.id,
      role: decodedUser.role || decodedUser.roles,
      email: decodedUser.email,
      ...decodedUser,
    };

    sessionStorage.setItem("userId", formattedUser.id);
    sessionStorage.setItem("userRole", formattedUser.role);
    sessionStorage.setItem("token", token);
    setUser(formattedUser);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        const formattedUser = {
          id: decodedUser.sub || decodedUser.id,
          role: decodedUser.role || decodedUser.roles,
          email: decodedUser.email,
          ...decodedUser,
        };
        setUser(formattedUser);
      } catch (error) {
        console.error("Token invalid sau expirat:", error);
        handleLogout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
