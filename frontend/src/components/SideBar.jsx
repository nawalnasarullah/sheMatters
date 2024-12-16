import React, { useState } from "react";
import {
  Drawer,
  Typography,
  ThemeProvider,
  Box,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import { Link } from "react-router-dom";
import { useGetMeQuery, useLazyLogoutQuery } from "../redux/api/authApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import theme from "./Theme";

function SideBar() {
  const { data } = useGetMeQuery();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [logout] = useLazyLogoutQuery();
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Detect screen size
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = async () => {
    const res = await logout().unwrap();
    console.log("logout", res);
    navigate(0);
  };

  return (
    <ThemeProvider theme={theme}>
      {isSmallScreen ? (
        <>
          {/* Top Bar with "SheMatters" on the left and Hamburger on the right */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between", // Push items to far ends
              alignItems: "center",
              padding: "10px 16px", // Adjust padding for spacing
              backgroundColor: "white", // Match the drawer background
              borderBottom: "1px solid #e0e0e0", // Optional: subtle border
              position: "sticky", // Keep it at the top
              top: 0,
              zIndex: 1200,
            }}
          >
            <Typography
              variant="h5"
              color="primary.main"
              sx={{
                fontWeight: 600,
                marginLeft: "10px", // Adjust spacing for small screens
              }}
            >
              SheMatters
            </Typography>

            <IconButton
              onClick={toggleDrawer(true)}
              sx={{
                color: "primary.main",
                marginRight: "10px", // Space on the right
              }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Box>

          {/* Temporary Drawer for Small Screens */}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                width: 260,
                backgroundColor: "white.main",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 2,
                position: "relative",
                padding: "20px",
              }}
            >
              <IconButton
                sx={{ position: "absolute", top: 15, right: 8 }}
                onClick={toggleDrawer(false)}
              >
                <CloseRoundedIcon />
              </IconButton>
              <Typography
                variant="h5"
                color="primary.main"
                sx={{ fontWeight: 600 }}
              >
                SheMatters
              </Typography>
              <Button
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <HomeRoundedIcon
                  sx={{ marginRight: "10px", marginBottom: "3px" }}
                />
                Dashboard
              </Button>
              <Button
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <EventNoteRoundedIcon
                  sx={{ marginRight: "10px", marginBottom: "3px" }}
                />
                Consultation
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "center",
                justifyContent: "center",
                marginTop: "180px",
              }}
            >
              <Button onClick={handleLogout} component={Link} to="/">
                Log Out
              </Button>

              <Button
                component={Link}
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.hover",
                  },
                  color: "white.main",
                }}
              >
                Account
              </Button>
            </Box>
          </Drawer>
        </>
      ) : (
        // Persistent Drawer for Larger Screens
        <Drawer
          variant="permanent"
          PaperProps={{
            sx: {
              width: 260,
              backgroundColor: "white.main",
              padding: "25px",
              borderWidth: "1px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="h5"
              color="primary.main"
              sx={{ fontWeight: 600 }}
            >
              SheMatters
            </Typography>
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <HomeRoundedIcon
                sx={{ marginRight: "10px", marginBottom: "3px" }}
              />
              Dashboard
            </Button>
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <EventNoteRoundedIcon
                sx={{ marginRight: "10px", marginBottom: "3px" }}
              />
              Consultation
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
              marginTop: "190px",
            }}
          >
            <Button
              component={Link}
              variant="contained"
              sx={{
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.hover",
                },
                color: "white.main",
              }}
            >
              Account
            </Button>
            <Button onClick={handleLogout} component={Link} to="/">
              Log Out
            </Button>
          </Box>
        </Drawer>
      )}
    </ThemeProvider>
  );
}

export default SideBar;
