import { createContext, useState, useEffect } from "react";
import socket from "../services/socket";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleHired = (data) => {
      console.log("📬 Hire notification received:", data);
      const newNotif = {
        id: Date.now(),
        message: data.message,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    };

    socket.on("hired", handleHired);

    return () => {
      socket.off("hired", handleHired);
    };
  }, []); 

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
