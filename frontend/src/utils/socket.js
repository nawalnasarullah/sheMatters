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

export const callUser = ({ targetId, signalData, caller }) => {
  socket.emit('call-user', { targetId, signalData, caller });
};

export const answerCall = ({ signal, to }) => {
  socket.emit('answer-call', { signal, to });
};

export const onIncomingCall = (cb) => {
  socket.on('incoming-call', cb);
};

export const onCallAccepted = (cb) => {
  socket.on('call-accepted', cb);
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket.off("get-online-users");
    socket.off("newMessage");
    socket.off("incoming-call");
    socket.off("call-accepted");
    socket = null;
    console.log("Socket forcefully disconnected.");
  }
};

export const getSocket = () => socket;
