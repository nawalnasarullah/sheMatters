import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../redux/api/chatApi";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { Box, Avatar, Typography } from "@mui/material";

const ChatContainer = () => {
  const selectedUser = useSelector((state) => state.chat.selectedUser);

  const {isAuthenticated, user} = useSelector(state => state.auth);


  console.log('user in chat container:', user);
  

  const messageEndRef = useRef(null);
  
  const {
    data: messages = [],
    isLoading: isMessagesLoading,
    refetch,
  } = useGetMessagesQuery(selectedUser?._id, {
    skip: !selectedUser,
  });

  console.log(
    messages.senderId,
  );
  

 
  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading || !selectedUser) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

       <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 4,
          pl: 28,
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
              flexDirection: message.senderId === user?.user?._id ? "row-reverse" : "row",
              alignItems: "flex-start",
              marginBottom: 2,
            }}
            ref={messageEndRef}
          >
            <Box sx={{ marginRight: 2 }}>
              <Avatar
                src={
                  message.senderId === user?.user?._id
                    ? user.avatar || "/avatar.png"
                    : selectedUser.avatar || "/avatar.png"
                }
                alt="profile pic"
                sx={{ width: 40, height: 40 }}
              />
            </Box>

            <Box sx={{ maxWidth: "70%" }}>
              <Box
                sx={{
                  backgroundColor: message.senderId === user?.user?._id ? "primary.main" : "grey.300",
                  borderRadius: 2,
                  p: 2,
                  color: message.senderId === user?.user?._id ? "white" : "black",
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
                {message.text && <Typography variant="body2">{message.text}</Typography>}
              </Box>
            </Box>
          </Box>
        ))}
        {/* Ref point for scrolling to the bottom */}
        <div ref={messageEndRef} />
      </Box>

      <MessageInput refetchMessages={refetch} />
    </div>
  );
};

export default ChatContainer;
