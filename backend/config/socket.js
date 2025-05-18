import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});


// Track online users
const userSocketMap = {}; // { userId: socket.id }

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const initSocket = () => {
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id;
      socket.join(userId); 

      console.log(`User ${userId} connected with socket ${socket.id}`);
      
      // Emit to all clients the updated list of online users
      io.emit("get-online-users", Object.keys(userSocketMap));
    }

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      // Remove user from map
      for (const [uid, sid] of Object.entries(userSocketMap)) {
        if (sid === socket.id) {
          delete userSocketMap[uid];
          break;
        }
      }

      // Emit updated online users list and phir yahan se frontend wali socket file mein recieve karna hai
      io.emit("get-online-users", Object.keys(userSocketMap));
    });
  });
};

export { app, server, io, initSocket };
