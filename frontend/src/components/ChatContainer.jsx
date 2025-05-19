import React from "react";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../redux/api/chatApi";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import {
  Box,
  Avatar,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Skeleton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { onNewMessage, offNewMessage, connectSocket } from "../utils/socket";

 function ChatContainer ({ user }) {
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const messageEndRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    data: messages = [],
    isLoading: isMessagesLoading,
    refetch,
  } = useGetMessagesQuery(selectedUser?._id, {
    skip: !selectedUser,
  });

  useEffect(() => {
  if (messageEndRef.current) {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);
  
  useEffect(() => {
    if(user._id) 
    connectSocket(user._id);
  })
  useEffect(() => {
  const handleNewMessage = (message) => {
    console.log("New message received:", message);
    
    if (message.senderId === selectedUser?._id || message.receiverId === selectedUser?._id) {
      refetch();
    }
  };

  onNewMessage(handleNewMessage);

  return () => {
    offNewMessage(handleNewMessage);
  };
}, [user, selectedUser, refetch]);



  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isMessagesLoading || !selectedUser) {
    return (
     <>
      <div className="flex-1 flex items-center justify-center mt-28 animate-bounce">
        <img
          src="/images/undraw_chat.svg"
          alt="loading"
          className="max-w-[400px] w-full"
        />
      </div>
      <Typography
        variant="h5"
        sx={{
          color: "primary.main",
          fontSize: 18,
          textAlign: "center",
        }}
      >
        Select a user to start a conversation
      </Typography>
     </>
    );
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ position: "sticky", top: "15px", zIndex: 10 }}>
        <ChatHeader currentUser={user} />
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 4,
          pl: 12,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {messages.map((message) => (
          <Box
            key={message._id}
            sx={{
              display: "flex",
              flexDirection:
                message.senderId === user._id ? "row-reverse" : "row",
              alignItems: "baseline",
              marginRight: message.senderId === user._id ? 6 : 1,
            }}
          >
            <Avatar
              src={
                message.senderId === user._id
                  ? user.avatar || "/avatar.png"
                  : selectedUser.avatar || "/avatar.png"
              }
              alt="profile pic"
              sx={{ width: 50, height: 50 }}
            />
            
            <Box sx={{ maxWidth: "70%" }}>
              <Box
                sx={{
                  backgroundColor:
                    message.senderId === user._id
                      ? "primary.chatBar"
                      : "secondary.chatBar",
                  borderRadius: 2,
                  p: "14px",
                  marginRight: message.senderId === user._id ? 2 : 0,
                  marginLeft: message.senderId === user._id ? 0 : 2,
                  display: "flex",
                  flexDirection: "column",
                  wordWrap: "break-word",
                }}
              >
                {message.image && (
                  <Box
                    component="img"
                    src={message.image}
                    alt="Attachment"
                    onClick={() => setPreviewImage(message.image)}
                    sx={{
                      maxWidth: 200,
                      borderRadius: 1,
                      mb: 2,
                      cursor: "pointer",
                      transition: "0.2s",
                      "&:hover": {
                        opacity: 0.8,
                      },
                    }}
                  />
                )}
                {message.message && (
                  <Typography variant="body2">{message.message}</Typography>
                )}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: "grey.main",
                  mt: 1,
                  display: "flex",
                  justifyContent:
                  message.senderId === user._id ? "flex-end" : "flex-start",
                }}
              >
                {formatTime(message.createdAt)}
              </Typography>
            </Box>
          </Box>
        ))}
        <div ref={messageEndRef} />
      </Box>

      <Box sx={{ 
        position: "sticky", 
        bottom: 0, 
        zIndex: 10,
        bgcolor: "background.paper",
        p: 2,
        borderTop: "1px solid",
        borderColor: "divider"
      }}>
        <MessageInput refetchMessages={refetch} />
      </Box>

      {/* Image Preview */}
      <Dialog
        open={!!previewImage}
        onClose={() => setPreviewImage(null)}
        maxWidth="md"
      >
        <DialogContent sx={{ position: "relative", p: 0 }}>
          <IconButton
            onClick={() => setPreviewImage(null)}
            sx={{ 
              position: "absolute", 
              top: 8, 
              right: 8, 
              zIndex: 10,
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={previewImage}
            alt="Preview"
            sx={{ 
              width: "100%", 
              maxHeight: "90vh", 
              objectFit: "contain",
              display: 'block'
            }}
            loading="lazy"
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ChatContainer;