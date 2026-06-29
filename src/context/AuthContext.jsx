import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userId, setUserId] = useState(() => {
    const t = localStorage.getItem("token");
    if (!t) return null;
    try { return JSON.parse(atob(t.split(".")[1])).sub; } catch { return null; }
  });

  const setAuth = (accessToken) => {
    localStorage.setItem("token", accessToken);
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    setToken(accessToken);
    setUserId(payload.sub);
  };

  const logout = async () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    if (token) {
      try {
        await fetch(`${API_BASE}/api/auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (_) {}
    }
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setToken(null);
    setUserId(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, userId, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
