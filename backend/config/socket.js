import { Server } from "socket.io"
import http from "http"
import express from "express"

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
})

// Track online users
const userSocketMap = {} // { userId: socket.id }

export function getReceiverSocketId(userId) {
  return userSocketMap[userId]
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
  if (participants.receiver.socketId) {
    io.to(participants.receiver.socketId).emit("incomingCall", participants);
  }
};

const onHangup = async (hangupData) => {
  let socketIdToEmitTo;
  if (
    hangupData.ongoingCall.participants.caller.userId ===
    hangupData.userHangingupId
  ) {
    socketIdToEmitTo = hangupData.ongoingCall.participants.receiver.socketId;
  } else {
    socketIdToEmitTo = hangupData.ongoingCall.participants.caller.socketId;
  }

  if (socketIdToEmitTo) {
    io.to(socketIdToEmitTo).emit("hangup");
  }
};

const initSocket = () => {

  let onlineUsers = []

  io.on("connection", (socket) => {
    // add user
    socket.on("addNewUser", (userId) => {

      console.log("adding new user :" , userId)
      userId && !onlineUsers.some((user) => user?.userId === userId) &&
        onlineUsers.push({
          userId: userId,
          socketId: socket.id
        })
      
      console.log("Updated users : " , onlineUsers)
      // send active users
      io.emit("getUsers", onlineUsers)
    })

    socket.on("disconnect", () => {
      console.log("disconnecting user ...")
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)

      // send active users
      io.emit("getUsers", onlineUsers)
    })

    socket.on('send-message' , (message) => {

      let reciever = onlineUsers.find( (user) => user.userId === message.reciever )
      console.log("sending message to :" ,reciever['userId'] , " :  message : " , message['message'])
      socket.to(reciever['socketId']).emit("recieve-message" , message)      
    })

    socket.on("call", onCall);
    socket.on("webrtcSignal", onWebrtcSignal);
    socket.on("hangup", onHangup);
  })


}

export { app, server, io, initSocket }
