import { useSelector } from "react-redux";
import React from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "../../components/Theme";
import { Avatar, IconButton, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";


function ProfileNav() {

    
  const {isAuthenticated, psychologist} = useSelector(state => state.psychologistAuth);

  return (
    <ThemeProvider theme={theme}>
      <div className="flex justify-between items-center px-5 py-5 shadow-md ms-0 lg:ms-[231px]">
        {/* Left Section */}
        <div>
          <Typography variant="h5" color="primary.main" sx={{ fontWeight: 600,  lineHeight: 1.2,  letterSpacing: "0.5px", fontSize: "1.2rem", }}>
            Welcome {psychologist?.firstName} {psychologist?.lastName}
          </Typography>
          <Typography variant="h5" color="grey.main" sx={{fontWeight: 400,  lineHeight: 1.2,  letterSpacing: "0.5px", fontSize: "0.9rem", }}>
            Manage your well-being with ease
          </Typography>
        </div>

    

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <IconButton sx={{"&:hover": { backgroundColor: "primary.light" }}}>
            <NotificationsNoneIcon color="grey.main" />
          </IconButton>
          <Avatar
            src= {psychologist?.avatar || "https://i.pravatar.cc/150?img=1"}
            alt="username"
            className="shadow-md"
          />
          <Typography variant="h5" color="primary.main" sx={{ fontWeight: 400,  lineHeight: 1.2,  letterSpacing: "0.5px", fontSize: "1rem", }}>
          {psychologist?.firstName} {psychologist?.lastName}
          </Typography>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ProfileNav;
