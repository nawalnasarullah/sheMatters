import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IconButton,
  Avatar,
  Typography,
  Box,
  ThemeProvider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import { setSelectedUser } from "../redux/features/chatSlice/";
import {
  connectSocket,
  disconnectSocket,
  onOnlineUsersUpdate,
} from "../utils/socket";
import theme from "./Theme";

function ChatHeader({ currentUser }) {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const currentUserId = currentUser._id;


  useEffect(() => {
    const socket = connectSocket(currentUserId);

    onOnlineUsersUpdate((users) => {
      console.log("Online users:", users);
      setOnlineUsers(users);
    });

    return () => {
      disconnectSocket();
    };
  }, [currentUserId]);
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.chat.selectedUser);

  if (!selectedUser) return null;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          padding: "5px 50px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              width: 50,
              height: 50,
              marginRight: 2,
            }}
            src={selectedUser.avatar || "/avatar.png"}
            alt={selectedUser.fullName}
          />
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "primary.main", fontSize: 18 }}
            >
              {selectedUser.firstName} {selectedUser.lastName}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                color: onlineUsers.includes(selectedUser._id)
                  ? "primary.main"
                  : "theme.palette.grey[500]",
              }}
            >
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton sx={{ "&:hover": { backgroundColor: "primary.light" } }}>
            <CallIcon sx={{ color: "primary.main", fontSize: "1.7rem" }} />
          </IconButton>
          <IconButton sx={{ "&:hover": { backgroundColor: "primary.light" } }}>
            <VideocamIcon sx={{ color: "primary.main", fontSize: "1.7rem" }} />
          </IconButton>
          <IconButton
            sx={{ "&:hover": { backgroundColor: "primary.light" } }}
            onClick={() => dispatch(setSelectedUser(null))}
            edge="end"
          >
            <CloseIcon sx={{ color: "primary.main", fontSize: "1.7rem" }} />
          </IconButton>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ChatHeader;
