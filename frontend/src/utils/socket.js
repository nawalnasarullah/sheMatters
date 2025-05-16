import { io } from "socket.io-client";

let socket;

export const connectSocket = (userId, onOnlineUsersUpdate) => {
  if (!socket) {
    socket = io("http://localhost:8000", {
      query: { userId },
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // Listen for online users update if callback provided
    if (typeof onOnlineUsersUpdate === "function") {
      socket.on("get-online-users", onOnlineUsersUpdate);
    }
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Socket forcefully disconnected.");
  }
};

export const getSocket = () => socket;
