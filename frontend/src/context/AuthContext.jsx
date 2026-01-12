import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (data) => {
    const res = await api.post("/auth/login", data);
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
  };

  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
