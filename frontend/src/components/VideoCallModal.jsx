import React, { useEffect , useState } from "react";
import { Box, Dialog, IconButton, Button , Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { useSocket } from "../context/SocketContext";

function VideoCallModal({ user }) {

  const { handleJoinCall , handleHangup , ongoingCall , localVideo , remoteVideo} = useSocket()
  const [micEnabled, setMicEnabled] = useState(true);
  const [camEnabled, setCamEnabled] = useState(true);

  const toggleMic = () => {
    if (!localVideo) return;
    const audioTrack = localVideo.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setMicEnabled(audioTrack.enabled);
    }
  };

  const toggleCamera = () => {
    if (!localVideo) return;
    const videoTrack = localVideo.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setCamEnabled(videoTrack.enabled);
    }
  };
  

  return (
    <Dialog open={Boolean(ongoingCall)} fullScreen>
      <Box sx={{}}>
        <IconButton
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 3,
            color: "primary.main",
          }}
          onClick={handleHangup}
        >
          <CloseIcon />
        </IconButton>

        {
            ongoingCall?.isRinging && ongoingCall?.caller && (
                <Typography
                sx={{
                    position : "absolute",
                    zIndex : 4,
                    top : '20%',
                    left : '50%',
                    transform : 'translate(-50% , -50%)'
                }}
                >Calling...</Typography>
            )
        }  

        {
            ongoingCall?.isRinging && ongoingCall?.reciever &&  (
                <>
                    <Typography
                    sx={{
                        position : "absolute",
                        zIndex : 4,
                        top : '20%',
                        left : '50%',
                        transform : 'translate(-50% , -50%)'
                    }}
                    >{ongoingCall.call.peer} is calling</Typography>
                    <Button
                        onClick={handleJoinCall}
                        sx={{
                        position: "absolute",
                        zIndex: 3,
                        top: "70%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        position: "absolute",
                        padding: "12px 24px",
                        fontSize: "18px",
                        color: "white.main",
                        backgroundColor: "primary.main",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                    >
                    Accept Call
                    </Button>
                </>
            )
        }  

        {
            ongoingCall?.accepted && (
                <video
                  ref={remoteVideo}
                   onError={(e) => console.log("Local video error:", e)}
                  autoPlay
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}
                />
            )
        }

   
        <video
          ref={localVideo}
            onError={(e) => console.log("Remote video error:", e)}
          autoPlay
          muted
          playsInline
          style={{
            position: "absolute",
            width: 200,
            height: 150,
            top: 20,
            right: 20,
            borderRadius: 8,
            zIndex: 2,
            objectFit: "cover",
          }}
        />
      </Box>
        
   
      { ongoingCall && (
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 3,
            zIndex: 100,
            bgcolor: "primary.main",
            p: 1,
            borderRadius: "999px",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleHangup} sx={{ color: "white.main" }}>
            <CallEndIcon />
          </IconButton>

     
          <IconButton
            onClick={toggleMic}
            sx={{ color: micEnabled ? "white" : "grey.500" }}
          >
            {micEnabled ? <MicIcon /> : <MicOffIcon />}
          </IconButton>

          <IconButton
            onClick={toggleCamera}
            sx={{ color: camEnabled ? "white" : "grey.500" }}
          >
            {camEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
          </IconButton>
        </Box>
      )}
    </Dialog>
  );
}

export default VideoCallModal;