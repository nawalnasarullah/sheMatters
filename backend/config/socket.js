import { Server } from "socket.io"
import http from "http"
import express from "express"
// import { Peer } from "peerjs";

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

    // other events
    // socket.on("call", onCall)
    // socket.on("webrtcSignal", onWebrtcSignal)
    // socket.on("hangup", onHangup)
  })

  // const peer = new Peer(undefined , {
  //   host : '/',
  //   port : '8001'
  // })
}

export { app, server, io, initSocket }
