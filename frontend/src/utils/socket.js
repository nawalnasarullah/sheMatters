import { io } from "socket.io-client";

let socket;

export const connectSocket = (userId, onOnlineUsersUpdate, onNewMessage) => {
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

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    // Online user listener if callback provided
    if (typeof onOnlineUsersUpdate === "function") {
      socket.on("get-online-users", onOnlineUsersUpdate);
    }

   
    
    // New message listener 
    if (typeof onNewMessage === "function") {
      console.log("New message listener added");
      
      socket.on("newMessage", onNewMessage);
       console.log('newMessage', onNewMessage);
    }
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {

    socket.off("connect");
    socket.off("disconnect");
    socket.off("connect_error");
    socket.off("get-online-users");
    socket.off("newMessage");

    socket.disconnect();
    socket = null;
    console.log("Socket forcefully disconnected.");
  }
};

export const getSocket = () => socket;