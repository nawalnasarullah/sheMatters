import { useSelector } from "react-redux"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { createContext } from "react"
import { Socket, io } from "socket.io-client"
import Peer from "peerjs"

export const SocketContext = createContext(null)

export const SocketContextProvider = (props) => {
  //very bad
  const user = useSelector((state) => state.auth.user?.user)
    ? useSelector((state) => state.auth.user?.user)
    : useSelector((state) => state.psychologistAuth?.psychologist)

  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState(null)
  const [ongoingCall, setOngoingCall] = useState(null)
  const [peer, setPeer] = useState(null)
  const [peerId, setPeerId] = useState(null)
  const peerRef = useRef(null)
  const [localVideo , setLocalVideo] = useState(null);
  const [remoteVideo , setRemoteVideo] = useState(null);
  const [isCallEnded, setIsCallEnded] = useState(false)

  const currentSocketUser = onlineUsers?.find(
    (onlineUser) => onlineUser.userId === user?._id
  )


  const handleCall = useCallback(
      (remotePeerId) => {
        var getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia

        getUserMedia({ video: true, audio: true }, (mediaStream) => {
          console.log("calling with media stream : ", mediaStream)
          setLocalVideo(mediaStream)
          
          const call = peerRef.current.call(remotePeerId, mediaStream)
          setOngoingCall({ isRinging : true , call : call , caller : true , reciever : false })

          call.on("stream", (remoteStream) => {
            console.log("recieveing a remote stream : ", remoteStream)
            setRemoteVideo(remoteStream)
            setOngoingCall((ongoing)=>{
              return { ...ongoing , isRinging : false , accepted : true}
            })
          })
        })
      },
      [peerRef]
  )

  const handleJoinCall = useCallback( () => {

    const call = ongoingCall["call"]
    if(!call)
      console.error("Could not join call")

    console.log("Accepting call : " , call)
    setOngoingCall((ongoing) => { 
      return { ...ongoing , isRinging : false , reciever : true , caller : false }
    })
    

    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      // currentUserVideoRef.current.play();
      //localVideo.current  = mediaStream
      setLocalVideo(mediaStream)
      call.answer(mediaStream)
      call.on("stream", function (remoteStream) {
        console.log("Recieving remote stream : ", remoteStream)
        setOngoingCall((ongoing)=>{
          return { ...ongoing , isRinging : false , accepted : true}
        })
        setRemoteVideo(remoteStream)
      })
    })


  } , [ongoingCall] )

  const handleHangup = () => {
    if(!ongoingCall.call) return 
    
    ongoingCall.call.close()
    setOngoingCall(null)
  }

  // initialize socket
  useEffect(() => {
    if (!user?._id) return

    const newSocket = io("http://localhost:8000")
    console.log("set new socket : ", newSocket)
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [user])

  //establish peer connection
  useEffect(() => {
    if (peerRef.current || !socket || !user._id) return

    const peer = new Peer()
    setPeer(peer)

    peer.on("open", (id) => {
      setPeerId(id)
      console.log("Established peer server connection with ID : ", id)
      //socket.emit("store-peer-id" , { peerId : id , userId : user._id })
    })

    peer.on("call", (call) => {
      console.log("getting a call from some retard : " , call.peer)
      console.log("call value : " , call)
      setOngoingCall({
        isRinging : true,
        callerPeerId : call.peer,
        reciever : true ,
        call : call
      })
    })

    peerRef.current = peer
  }, [socket, user])

  //setting connect status
  useEffect(() => {
    if (socket === null) return

    if (socket.connected) {
      onConnect()
    }

    function onConnect() {
      if (socket) {
        setIsConnected(true)
      }
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
    }
  }, [socket])

  // set online users
  useEffect(() => {
    if (!socket || !isConnected || !peerId) return
    console.log("emitting new user : ", user)
    socket.emit("addNewUser", { userId : user?._id , peerId : peerId })
    socket.on("getUsers", (res) => {
      console.log("Got new list of online users : ", res)
      setOnlineUsers(res)
    })

    return () => {
      socket.off("getUsers")
    }
  }, [socket, isConnected, user , peerId])



  useEffect(() => {
    let timeout
    if (isCallEnded) {
      timeout = setTimeout(() => {
        setIsCallEnded(false)
      }, 2000)
    }

    return () => clearTimeout(timeout)
  }, [isCallEnded])

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        ongoingCall,
        localVideo,
        remoteVideo,
        peer,
        isCallEnded,
        handleCall,
        handleJoinCall,
        handleHangup,
      }}
      {...props}
    />
  )
}

export const useSocket = () => {
  const context = useContext(SocketContext)

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider")
  }

  return context
}
