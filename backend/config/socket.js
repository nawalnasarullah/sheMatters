import { Server } from "socket.io"
import http from "http"
import express from "express"
import { ExpressPeerServer } from "peer"

const app = express()
const server = http.createServer(app)

//this creates a peer server which is responsible for handling peer to peer connections
//gg ez hqhqhqhqhq
const peerServer = ExpressPeerServer( server , {
  debug : true
})

app.use('/peerjs' , peerServer)

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
  console.log("recieving call : " , participants)
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
    socket.on("addNewUser", (user) => {

      console.log("adding new user :" , user.userId)
      user && !onlineUsers.some((existing) => existing?.userId === user.userId) &&
        onlineUsers.push({
          userId: user.userId,
          peerId : user.peerId,
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

    socket.on('store-peer-id' , (user) => {
      for ( let onlineUser of onlineUsers )
      {
        if(onlineUser.userId === user.userId)
        {
          console.log("Attached peer id to user : " , user.userId)
          onlineUser['peerId'] = user.peerId
          break
        }
      }
      socket.emit("getUsers" , onlineUsers)
    })

    socket.on("call", onCall);
    socket.on("webrtcSignal", onWebrtcSignal);
    socket.on("hangup", onHangup);
  })


}

export { app, server, io, initSocket }
