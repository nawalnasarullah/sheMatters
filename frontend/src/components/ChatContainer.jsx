import { useRef, useEffect, useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ChatContainer = ({ userId }) => {
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

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading || !selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center mt-24 animate-pulse">
        <img
          src="/images/undraw_chat.svg"
          alt="loading"
          className="max-w-[400px] w-full"
        />
      </div>
    );
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ position: "sticky", top: "15px", zIndex: 10 }}>
        <ChatHeader />
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
                message.senderId === userId ? "row-reverse" : "row",
              alignItems: "baseline",
              marginRight: message.senderId === userId ? 6 : 1,
            }}
          >
            <Avatar
              src={
                message.senderId === userId
                  ? userId.avatar || "/avatar.png"
                  : selectedUser.avatar || "/avatar.png"
              }
              alt="profile pic"
              sx={{ width: 50, height: 50 }}
            />

            <Box sx={{ maxWidth: "70%" }}>
              <Box
                sx={{
                  backgroundColor:
                    message.senderId === userId
                      ? "primary.chatBar"
                      : "secondary.chatBar",
                  borderRadius: 2,
                  p: "14px",
                  marginRight: message.senderId === userId ? 2 : 0,
                  marginLeft: message.senderId === userId ? 0 : 2,
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
                    message.senderId === userId
                      ? "flex-end"
                      : "flex-start",
                }}
              >
                {formatTime(message.createdAt)}
              </Typography>
            </Box>
          </Box>
        ))}
        <div ref={messageEndRef} />
      </Box>

      <Box sx={{ position: "sticky", bottom: "20px", zIndex: 10 }}>
        <MessageInput refetchMessages={refetch} />
      </Box>

      {/* Image Preview */}
      <Dialog open={!!previewImage} onClose={() => setPreviewImage(null)} maxWidth="md">
        <DialogContent sx={{ position: "relative", p: 0 }}>
          <IconButton
            onClick={() => setPreviewImage(null)}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={previewImage}
            alt="Preview"
            sx={{ width: "100%", maxHeight: "90vh", objectFit: "contain" }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ChatContainer;
