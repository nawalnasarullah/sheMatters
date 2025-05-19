import { useSelector } from "react-redux";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { Socket, io } from "socket.io-client";
import Peer from "peerjs";


export const SocketContext = createContext(null);

export const SocketContextProvider = (props) => {
    //const {psychologist} = useSelector(state => state.psychologistAuth);
    const user = useSelector((state) => state.auth.user)

    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState(null);
    const [ongoingCall, setOngoingCall] = useState(null)
    const [localStream, setLocalStream] = useState(null);
    const [peer, setPeer] = useState(null);
    const peerRef = useRef(null);
    const [isCallEnded, setIsCallEnded] = useState(false)

    const currentSocketUser = onlineUsers?.find(onlineUser => onlineUser.userId === user?._id)

    //establish Peer 
    useEffect(() => {
        if (!user?._id) return;

        const newPeer = new Peer(user._id); // use user.id as peerId
        peerRef.current = newPeer;
        setPeer(newPeer);

        newPeer.on('open', (id) => {
            console.log('PeerJS connected with ID:', id);
        });

        newPeer.on('call', async (call) => {
            const stream = await getMediaStream();
            call.answer(stream); // Answer the call with our stream

            call.on('stream', (remoteStream) => {
                setPeer({
                    peerConnection: call,
                    participantUser: call.metadata?.caller,
                    stream: remoteStream
                });
            });

            call.on('close', () => handleHangup({ callEnded: true }));
        });

            return () => {
                newPeer.destroy();
            };
    }, [user]);


    const getMediaStream = useCallback(
        async (faceMode) => {
            if (localStream) {
                return localStream;
            }

            try {
                // Get all media devices
                const devices = await navigator.mediaDevices.enumerateDevices();

                // Filter out only the video input devices
                const videoDevices = devices.filter((device) => device.kind === 'videoinput');

                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { min: 640, ideal: 1280, max: 1920 },
                        height: { min: 360, ideal: 720, max: 1080 },
                        frameRate: { min: 16, ideal: 30, max: 30 },
                        facingMode: videoDevices.length > 0 ? faceMode : undefined
                    },
                    audio: true
                });

                setLocalStream(stream);

                return stream;
            } catch (error) {
                console.error('Failed to get stream', error);
                setLocalStream(null);
                return null;
            }
        },
        [localStream]
    );

    const onIncomingCall = useCallback((participants) => {
        if (ongoingCall && socket && user) {
            socket.emit('hangup', {
                ongoingCall: {
                    participants,
                    isRinging: false,
                },
                userHangingupId: user._id
            })
            return
        }

        setOngoingCall({
            participants,
            isRinging: true,
        })
    }, [ongoingCall, socket, user])


    const handleCall = useCallback(async (userToCall) => {
        setIsCallEnded(false);
        if (!currentSocketUser) return;
        if (ongoingCall) return alert("Already in a call");

        const stream = await getMediaStream();
        if (!stream || !peerRef.current) return;

        const participants = { caller: currentSocketUser, receiver: userToCall };
        setOngoingCall({ participants, isRinging: false });

        const call = peerRef.current.call(userToCall, stream, {
            metadata: { caller: currentSocketUser }
        });

        call.on('stream', (remoteStream) => {
            setPeer({
                peerConnection: call,
                participantUser: userToCall,
                stream: remoteStream
            });
        });

        call.on('close', () => handleHangup({ callEnded: true }));

        socket?.emit('call', participants);
    }, [currentSocketUser, ongoingCall, socket]);


    const handleJoinCall = useCallback(async (ongoingCall) => {
        setIsCallEnded(false);
        setOngoingCall(prev => ({
            ...prev,
            isRinging: false
        }));
    }, []);

    const handleHangup = useCallback((data) => {
        if (socket && user && data?.ongoingCall && !data?.callEnded) {
            socket.emit('hangup', {
                ongoingCall: data.ongoingCall,
                userHangingupId: user._id
            })
        }

        setOngoingCall(null)
        setPeer(null)
        if (localStream) {
            localStream.getTracks().forEach((track => track.stop()))
            setLocalStream(null)
        }
        setIsCallEnded(true)
    }, [socket, user, localStream])

    // initialize socket
    useEffect(() => {
        const newSocket = io("http://localhost:8000");
        console.log('set new socket : ' , newSocket)
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user]);

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

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, [socket]);

    // set online users
    useEffect(() => {
        if (!socket || !isConnected) return;
        console.log("emitting new user : " , user)
        socket.emit("addNewUser", user._id);
        socket.on("getUsers", (res) => {
            console.log("Got new list of online users : " , res)
            setOnlineUsers(res);
        });

        return () => {
            socket.off("getUsers");
        };
    }, [socket, isConnected, user]);

    // calls
    useEffect(() => {
        if (!socket || !isConnected) return;

        socket.on("incomingCall", onIncomingCall);
        socket.on("hangup", () => handleHangup({ callEnded: true }));

        return () => {
            socket.off("incomingCall", onIncomingCall);
            socket.off("hangup");
        };
    }, [socket, isConnected, user, onIncomingCall, handleHangup]);

    useEffect(() => {
        let timeout
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
                localStream,
                peer,
                isCallEnded,
                handleCall,
                handleJoinCall,
                handleHangup
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
