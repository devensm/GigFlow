import { io } from "socket.io-client";

const socket = io("https://gigflow-backend-b9fu.onrender.com", {
  withCredentials: true,
  autoConnect: true,
});

export default socket;
