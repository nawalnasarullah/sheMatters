import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Avatar, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from '@mui/icons-material/Videocam';
import { setSelectedUser } from "../redux/features/chatSlice/";

function ChatHeader() {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.chat.selectedUser);

  if (!selectedUser) return null;

  return (
    <Box
      sx={{
        padding: "10px 90px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            marginRight: 2,
          }}
          src={selectedUser.avatar || "/avatar.png"}
          alt={selectedUser.fullName}
        />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: 'primary.main', fontSize: 18 }}>
            {selectedUser.firstName} {selectedUser.lastName}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton  sx={{ "&:hover": {backgroundColor: "primary.light" }}} >          
          <CallIcon sx={{ color: 'primary.main', fontSize: "1.7rem" }} />
        </IconButton>
        <IconButton  sx={{ "&:hover": {backgroundColor: "primary.light" }}} >
          <VideocamIcon sx={{ color: 'primary.main', fontSize: "1.7rem"}}  />
        </IconButton>
        <IconButton sx={{ "&:hover": {backgroundColor: "primary.light" }}} onClick={() => dispatch(setSelectedUser(null))} edge="end">
          <CloseIcon sx={{ color: 'primary.main', fontSize: "1.7rem"}}  />
        </IconButton>
      </Box>
    </Box>
  );
}

export default ChatHeader;
