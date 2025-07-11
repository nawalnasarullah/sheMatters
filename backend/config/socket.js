import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ExpressPeerServer } from "peer";
import { CallRecord } from "../models/callRecord.model.js";
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://shematters.netlify.app"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//this creates a peer server which is responsible for handling peer to peer connections
//gg ez hqhqhqhqhq
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use("/peerjs", peerServer);

// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173", "https://shematters.netlify.app"],
//     credentials: true,
//   },
// });

// Track online users
const userSocketMap = {}; // { userId: socket.id }

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const onWebrtcSignal = async (data) => {
  if (data.isCaller) {
    if (data.ongoingCall.participants.receiver.socketId) {
      io.to(data.ongoingCall.participants.receiver.socketId).emit(
        "webrtcSignal",
        {
          sdp: data.sdp,
          ongoingCall: data.ongoingCall,
          isCaller: true,
        }
      );
    }
  } else {
    if (data.ongoingCall.participants.caller.socketId) {
      if (data.ongoingCall.participants.caller.socketId) {
        io.to(data.ongoingCall.participants.caller.socketId).emit(
          "webrtcSignal",
          {
            sdp: data.sdp,
            ongoingCall: data.ongoingCall,
            isCaller: false,
          }
        );
      }
    }
  }
};

const onCall = async (participants) => {
  console.log("recieving call : ", participants);
  if (participants.receiver.socketId) {
    io.to(participants.receiver.socketId).emit("incomingCall", participants);
  }
};

const onHangup = async (data) => {
  if (data.receiverSocketId) {
    io.to(data.receiverSocketId).emit("hangup");
  }
};

const initSocket = () => {
  let onlineUsers = [];

  io.on("connection", (socket) => {
    // add user
    socket.on("addNewUser", (user) => {
      console.log("adding new user :", user.userId);
      user &&
        !onlineUsers.some((existing) => existing?.userId === user.userId) &&
        onlineUsers.push({
          userId: user.userId,
          peerId: user.peerId,
          socketId: socket.id,
        });

      // send active users
      io.emit("getUsers", onlineUsers);
    });

    socket.on("disconnect", () => {
      console.log("disconnecting user ...");
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

      // send active users
      io.emit("getUsers", onlineUsers);
    });

    socket.on("send-message", (message) => {
      let reciever = onlineUsers.find(
        (user) => user.userId === message.reciever
      );
      console.log(
        "sending message to :",
        reciever?.userId,
        " :  message : ",
        message["message"]
      );
      socket.to(reciever?.socketId).emit("recieve-message", message);
    });

    socket.on("store-peer-id", (user) => {
      for (let onlineUser of onlineUsers) {
        if (onlineUser.userId === user.userId) {
          console.log("Attached peer id to user : ", user.userId);
          onlineUser["peerId"] = user.peerId;
          break;
        }
      }
      socket.emit("getUsers", onlineUsers);
    });

    socket.on("save-call-record", async (data) => {
  try {
    const newCall = new CallRecord({
      callerId: data.callerId,
      callerModel: data.callerModel,
      receiverId: data.receiverId,
      receiverModel: data.receiverModel,
      callType: data.callType,
      startedAt: data.startedAt,
      endedAt: data.endedAt,
      duration: data.duration,
    });

    await newCall.save();
    console.log("✅ Call record saved in MongoDB");
  } catch (error) {
    console.error("❌ Failed to save call record:", error.message);
  }
});

    socket.on("call", onCall);
    socket.on("webrtcSignal", onWebrtcSignal);
    socket.on("hangup", onHangup);
  });
};

export { app, server, io, initSocket };


