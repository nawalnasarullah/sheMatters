import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../redux/api/chatApi";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { Box, Avatar, Typography } from "@mui/material";

const ChatContainer = () => {
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const { user } = useSelector((state) => state.auth);
  const messageEndRef = useRef(null);

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
    <Box  sx={{ height: "100vh", display: "flex", flexDirection: "column"}}>
      {/* Fixed Header */}
      <Box sx={{ position: "sticky", top: "15px", zIndex: 10,  }}>
        <ChatHeader />
      </Box>

      {/* Scrollable Messages */}
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
                message.senderId === user?.user?._id ? "row-reverse" : "row",
              alignItems: "baseline",
              marginRight:
                message.senderId === user?.user?._id ? 6 : 1,
            }}
          >
            <Box>
              <Avatar
                src={
                  message.senderId === user?.user?._id
                    ? user.avatar || "/avatar.png"
                    : selectedUser.avatar || "/avatar.png"
                }
                alt="profile pic"
                sx={{ width: 50, height: 50 }}
              />
            </Box>

            <Box sx={{ maxWidth: "70%" }}>
              <Box
                sx={{
                  backgroundColor:
                    message.senderId === user?.user?._id
                      ? "primary.chatBar"
                      : "secondary.chatBar",
                  borderRadius: 2,
                  p: "14px",
                  marginRight: message.senderId === user?.user?._id ? 2 : 0,
                  marginLeft: message.senderId === user?.user?._id ? 2 : 0,
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
                    sx={{ maxWidth: 200, borderRadius: 1, mb: 2 }}
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
                    message.senderId === user?.user?._id
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

      {/* Fixed Input */}
      <Box sx={{ position: "sticky", bottom: "20px", zIndex: 10 }}>
        <MessageInput refetchMessages={refetch} />
      </Box>
    </Box>
  );
};

export default ChatContainer;
