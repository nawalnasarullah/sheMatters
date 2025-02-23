import { useSelector } from "react-redux";
import React from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "../../components/Theme";
import { Avatar, IconButton, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

function ProfileNav() {
  const { isAuthenticated, psychologist } = useSelector(
    (state) => state.psychologistAuth
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-wrap justify-between items-center px-5 py-4 shadow-md ms-0 lg:ms-[231px]">
        {/* Left Section */}
        <div className="w-full sm:w-auto text-center sm:text-left mb-3 sm:mb-0">
          <Typography
            variant="h5"
            color="primary.main"
            sx={{
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: "0.5px",
              fontSize: { xs: "1rem", sm: "1.2rem" }, // Responsive font size
            }}
          >
            Welcome {psychologist?.firstName} {psychologist?.lastName}
          </Typography>
          <Typography
            variant="h5"
            color="grey.main"
            sx={{
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: "0.5px",
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
            }}
          >
            Manage your well-being with ease
          </Typography>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Notification Icon */}
          <IconButton
            sx={{
              "&:hover": { backgroundColor: "primary.light" },
              width: { xs: "36px", sm: "42px" },
              height: { xs: "36px", sm: "42px" },
            }}
          >
            <NotificationsNoneIcon fontSize="medium" color="primary" />
          </IconButton>

          {/* Avatar */}
          <Avatar
            src={psychologist?.avatar || "https://i.pravatar.cc/150?img=1"}
            alt="username"
            className="shadow-md"
            sx={{
              width: { xs: "36px", sm: "48px" },
              height: { xs: "36px", sm: "48px" },
            }}
          />

          {/* Name */}
          <Typography
            variant="h5"
            color="primary.main"
            sx={{
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: "0.5px",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: { xs: "100px", sm: "150px" }, // Prevents breaking on small screens
            }}
          >
            {psychologist?.firstName} {psychologist?.lastName}
          </Typography>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ProfileNav;
