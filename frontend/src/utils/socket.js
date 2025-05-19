import { io } from "socket.io-client";

let socket;

export const connectSocket = (userId) => {
  if (socket) return socket;

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

  return socket;
};

export const onOnlineUsersUpdate = (callback) => {
  if (socket && typeof callback === "function") {
    socket.on("get-online-users", callback);
  }
};

export const onNewMessage = (callback) => {
  if (socket && typeof callback === "function") {
    socket.on("newMessage", callback);
    console.log("New message listener added");
  }
};



export const offNewMessage = (callback) => {
  if (socket && typeof callback === "function") {
    socket.off("newMessage", callback);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket.off("get-online-users");
    socket = null;
    console.log("Socket forcefully disconnected.");
  }
};

export const getSocket = () => socket;
