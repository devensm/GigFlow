import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import socket from "../services/socket";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      

      if (socket.connected) {
        socket.emit("register", parsedUser._id);
        console.log("User registered (already connected):", parsedUser._id);
      } else {
        socket.on("connect", () => {
          socket.emit("register", parsedUser._id);
          console.log("User registered (after connection):", parsedUser._id);
        });
      }
    }
    setLoading(false);

    return () => {
      socket.off("connect");
    };
  }, []);

  const login = async (data) => {
    const res = await api.post("/auth/login", data);
    setUser(res.data);
    socket.emit("register", res.data._id);
    localStorage.setItem("user", JSON.stringify(res.data));
  };

  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    setUser(res.data);
    socket.emit("register", res.data._id);
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
