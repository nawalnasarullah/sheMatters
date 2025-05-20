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

const userSocketMap = {}; // { userId: socketId }

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

      io.emit("get-online-users", Object.keys(userSocketMap));

      socket.on("call-user", ({ targetId, signalData, caller }) => {
        const targetSocket = userSocketMap[targetId];
        if (targetSocket) {
          io.to(targetSocket).emit("incoming-call", {
            signal: signalData,
            caller,
          });
        }
      });

      socket.on("answer-call", ({ signal, to }) => {
        const callerSocket = userSocketMap[to];
        if (callerSocket) {
          io.to(callerSocket).emit("call-accepted", signal);
        }
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);

        for (const [uid, sid] of Object.entries(userSocketMap)) {
          if (sid === socket.id) {
            delete userSocketMap[uid];
            break;
          }
        }

        io.emit("get-online-users", Object.keys(userSocketMap));
      });
    }
  });
};

export { app, server, io, initSocket };
