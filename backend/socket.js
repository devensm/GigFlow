import { Server } from "socket.io";

let io;
const onlineUsers = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["https://gigflow-frontend-0su9.onrender.com"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log("Registered:", userId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      for (let [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });

  return io;
};

export const getIO = () => io;
export { onlineUsers };
