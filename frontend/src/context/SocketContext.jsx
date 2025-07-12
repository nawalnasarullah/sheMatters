import { useSelector } from "react-redux";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { Socket, io } from "socket.io-client";
import Peer from "peerjs";

export const SocketContext = createContext(null);

export const SocketContextProvider = (props) => {
  //very bad
  const user = useSelector((state) => state.auth.user?.user)
    ? useSelector((state) => state.auth.user?.user)
    : useSelector((state) => state.psychologistAuth?.psychologist);

  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [ongoingCall, setOngoingCall] = useState(null);
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState(null);
  const peerRef = useRef(null);
  const [localVideo, setLocalVideo] = useState(null);
  const [remoteVideo, setRemoteVideo] = useState(null);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [callStartTime, setCallStartTime] = useState(null); // ✅ Added


  const currentSocketUser = onlineUsers?.find(
    (onlineUser) => onlineUser.userId === user?._id
  );

  const handleCall = useCallback(
    (remotePeerId, callType) => {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia(
        { video: callType === "video", audio: true },
        (mediaStream) => {
          console.log("calling with media stream : ", mediaStream);
          setLocalVideo(mediaStream);

          const call = peerRef.current.call(remotePeerId, mediaStream, {
            metadata: { caller: user?.firstName, callType },
          });
          setOngoingCall({
            isRinging: true,
            call: call,
            caller: true,
            reciever: false,
          });

          call.on("stream", (remoteStream) => {
            console.log("recieveing a remote stream : ", remoteStream);
            setRemoteVideo(remoteStream);
            setCallStartTime(new Date()); // ✅ Added
            setOngoingCall((ongoing) => {
              return { ...ongoing, isRinging: false, accepted: true };
            });
          });
        }
      );
    },
    [peerRef]
  );

  const handleJoinCall = useCallback(() => {
    const call = ongoingCall["call"];
    if (!call) {
      console.error("Could not join call");
      return;
    }

    console.log("Accepting call : ", call);
    setOngoingCall((ongoing) => {
      return {
        ...ongoing,
        isRinging: false,
        reciever: true,
        caller: false,
        accepted: true,
      };
    });

    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia(
      { video: call.metadata.callType === "video", audio: true },
      (mediaStream) => {
        setLocalVideo(mediaStream);
        call.answer(mediaStream);
        call.on("stream", function (remoteStream) {
          setCallStartTime(new Date()); // ✅ Added
          console.log("Recieving remote stream : ", remoteStream);
          setOngoingCall((ongoing) => {
            return { ...ongoing, isRinging: false, accepted: true };
          });
          setRemoteVideo(remoteStream);
        });
      }
    );
  }, [ongoingCall]);

 const handleHangup = () => {
  if (!ongoingCall?.call) return;

  // End local peer connection
  ongoingCall.call.close();

  // ✅ Save call record before cleanup
  const now = new Date();
  const duration = callStartTime
    ? Math.floor((now - new Date(callStartTime)) / 1000)
    : 0;

  if (socket && ongoingCall) {
    const otherUser = onlineUsers?.find(
      (u) =>
        u.peerId === ongoingCall?.callerPeerId ||
        u.peerId === ongoingCall?.call?.peer
    );

    socket.emit("save-call-record", {
      callerId: user._id,
      callerModel: user.role,
      receiverId: otherUser?.userId,
      receiverModel: user.role === "user" ? "psychologist" : "user",
      callType: ongoingCall?.call?.metadata?.callType || "video",
      startedAt: callStartTime?.toISOString(),
      endedAt: now.toISOString(),
      duration,
    });
  }

  setCallStartTime(null); // ✅ Reset start time

  // Emit 'hangup' to other user
  if (socket) {
    const otherUser = onlineUsers?.find(
      (u) =>
        u.peerId === ongoingCall?.callerPeerId ||
        u.peerId === ongoingCall?.call?.peer
    );

    if (otherUser?.socketId) {
      socket.emit("hangup", {
        senderId: user._id,
        receiverSocketId: otherUser.socketId,
      });
    }
  }

  // Stop and cleanup media tracks
  if (localVideo) {
    localVideo.getTracks().forEach((track) => track.stop());
    setLocalVideo(null);
  }

  if (remoteVideo) {
    remoteVideo.getTracks().forEach((track) => track.stop());
    setRemoteVideo(null);
  }

  setOngoingCall(null);
  setIsCallEnded(true);
};


  // initialize socket
  useEffect(() => {
    if (!user?._id) return;

    const newSocket = io(import.meta.env.VITE_API_URL, {
    // withCredentials: true,
    // transports: ["websocket", "polling"],
    // secure: true,
  });
    console.log("set new socket : ", newSocket);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  //establish peer connection
  useEffect(() => {
    if (peerRef.current || !socket || !user._id) return;

    // const peer = new Peer();
    const peer = new Peer(undefined, {
  host: "shematters-production.up.railway.app",
  port: 443,
  path: "/peerjs",
  secure: true,
});
    setPeer(peer);

    peer.on("open", (id) => {
      setPeerId(id);
      console.log("Established peer server connection with ID : ", id);
      //socket.emit("store-peer-id" , { peerId : id , userId : user._id })
    });

    peer.on("call", (call) => {
      console.log("getting a call from some retard : ", call.peer);
      console.log("call value : ", call);
      setOngoingCall({
        isRinging: true,
        callerPeerId: call.peer,
        reciever: true,
        call: call,
      });

      call.on("close", () => {
        console.log("Peer call closed");
        setOngoingCall(null);
        setLocalVideo(null);
        setRemoteVideo(null);
      });
    });

    peerRef.current = peer;
  }, [socket, user]);

  //setting connect status
  useEffect(() => {
    if (socket === null) return;

    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      if (socket) {
        setIsConnected(true);
      }
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hangup", () => {
      console.log("Received hangup from peer");

      // ✅ CLOSE peer connection
      if (ongoingCall?.call) {
        ongoingCall.call.close();
      }

      // ✅ CLEANUP streams
      if (localVideo) {
        localVideo.getTracks().forEach((track) => track.stop());
        setLocalVideo(null);
      }

      if (remoteVideo) {
        remoteVideo.getTracks().forEach((track) => track.stop());
        setRemoteVideo(null);
      }

      setOngoingCall(null);
      setIsCallEnded(true);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hangup");
    };
  }, [socket]);

  // set online users
  useEffect(() => {
    if (!socket || !isConnected || !peerId) return;
    console.log("emitting new user : ", user);
    socket.emit("addNewUser", { userId: user?._id, peerId: peerId });
    socket.on("getUsers", (res) => {
      console.log("Got new list of online users : ", res);
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getUsers");
    };
  }, [socket, isConnected, user, peerId]);

  useEffect(() => {
    let timeout;
    if (isCallEnded) {
      timeout = setTimeout(() => {
        setIsCallEnded(false);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [isCallEnded]);

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
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};
