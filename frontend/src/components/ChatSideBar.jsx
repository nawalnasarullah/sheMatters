import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemButton,
  ListItemAvatar,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../redux/api/chatApi";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/features/chatSlice";
import { useLazyLogoutQuery } from "../redux/api/authApi";
import theme from "./Theme";
import { useSocket } from "../context/SocketContext";
import { clearUserInfo } from "../redux/features/authSlice";
import { clearPsychologistInfo } from "../redux/features/psychologistAuthSlice";

function ChatSidebar({ user }) {
  const [logout] = useLazyLogoutQuery();
  const navigate = useNavigate();
  const {onlineUsers} = useSocket()
  const currentUserId = user?._id;

  const {user: authUser, isAuthenticated} = useSelector(state => state.auth);
  const { psychologist } = useSelector(state => state.psychologistAuth);

  const isPsychologist = Boolean(psychologist);
  const isUser = Boolean(authUser);

  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.chat.selectedUser);

  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  console.log("Users in ChatSidebar:", users);
  

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = async () => {
    await logout().unwrap();
    if (isPsychologist) {
      dispatch(clearPsychologistInfo());
    } else if (isUser) {
      dispatch(clearUserInfo());
    }
    navigate(0);
  };

  const handleSelectUser = (selectedUser) => {
    dispatch(setSelectedUser(selectedUser));
  };

 const renderUserList = () => {
  if (!users || users.length === 0) {
    return (
      <Typography variant="h5" sx={{ mt: 10, fontSize: "1rem" }} textAlign="center">
        No one to chat to 😔
      </Typography>
    );
  }

  return (
    <List>
      {users.map((user) => (
        <ListItem key={user?._id} disablePadding>
          <ListItemButton
            selected={selectedUser?._id === user?._id}
            onClick={() => handleSelectUser(user)}
            sx={{
              color: theme.palette.primary.main,
              borderRadius: "8px",
              marginBottom: "8px",
              borderBottom: `1px solid ${theme.palette.grey.chatgrey}`,
              "&.Mui-selected": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.main,
              },
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
              },
            }}
          >
            <ListItemAvatar sx={{ position: "relative" }}>
              <img
                src={
                  user.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt={user.username}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: onlineUsers?.some(
                    (onlineUser) => onlineUser.userId == user?._id
                  )
                    ? "primary.main"
                    : theme.palette.grey[400],
                  border: "2px solid white",
                }}
              />
            </ListItemAvatar>

            <ListItemText
              primary={
                <Typography fontWeight={600}>{user.username}</Typography>
              }
              secondary={
                <Typography
                  sx={{
                    color: onlineUsers?.some(
                      (onlineUser) => onlineUser.userId == user?._id
                    )
                      ? "primary.main"
                      : theme.palette.grey[500],
                  }}
                >
                  {onlineUsers?.some(
                    (onlineUser) => onlineUser.userId == user?._id
                  )
                    ? "Online"
                    : "Offline"}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};


  const accountAndLogoutButtons = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "150px",
      }}
    >
      <Button
        component={Link}
        to="/dashboard/accountInfo"
        variant="contained"
        sx={{
          backgroundColor: "primary.main",
          color: "white.main",
          "&:hover": { backgroundColor: "primary.hover" },
        }}
      >
        Account
      </Button>
      <Button onClick={handleLogout} component={Link} to="/">
        Log Out
      </Button>
    </Box>
  );

  if (isLoading) return <CircularProgress variant="soft" className="mx-auto mt-10" />;
  if (isError)
    return <Typography sx={{ p: 2 }}>Error loading users.</Typography>;

  return (
    <>
      {isSmallScreen ? (
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            backgroundColor: "white",
            overflowY: "auto",
            padding: 2,
            borderRight: `1px solid ${theme.palette.grey.chatgrey}`,
          }}
        >
          <Typography variant="h5" fontWeight={600} color="primary.main">
            SheMatters
          </Typography>
          {renderUserList()}
          {accountAndLogoutButtons}
        </Box>
      ) : (
        <Box
          sx={{
            width: 250,
            padding: 2,
            borderRight: `1px solid ${theme.palette.grey.chatgrey}`,
            backgroundColor: theme.palette.background.default,
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            overflowY: "auto",
          }}
        >
          <Typography variant="h5" fontWeight={600} color="primary.main">
            SheMatters
          </Typography>
          {renderUserList()}
          {accountAndLogoutButtons}
        </Box>
      )}
    </>
  );
}

export default ChatSidebar;
