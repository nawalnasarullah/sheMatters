import { io } from "socket.io-client";

let socket = null

export const connectSocket = (userId) => {

  if( socket ) return socket

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

    return socket
}

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