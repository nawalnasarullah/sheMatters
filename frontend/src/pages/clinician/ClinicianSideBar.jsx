import React, { useState } from "react";
import {
  Drawer,
  Typography,
  ThemeProvider,
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import { Link } from "react-router-dom";
import { useGetMeQuery, useLazyLogoutQuery } from "../../redux/api/psychologistAuthApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import theme from "../../components/Theme.jsx";

function SideBar() {
  const { data } = useGetMeQuery();
  const psychologistId = useSelector(
    (state) => state.psychologistAuth.psychologist._id
  );
  const [logout] = useLazyLogoutQuery();
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  // State for Journaling Dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const isDropdownOpen = Boolean(anchorEl);

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

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      {isSmallScreen ? (
        <>
          {/* Top Bar with "SheMatters" on the left and Hamburger on the right */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 16px",
              backgroundColor: "white",
              position: "sticky",
              top: 0,
              zIndex: 1200,
            }}
          >
            <Typography
              variant="h5"
              color="primary.main"
              sx={{
                fontWeight: 600,
                marginLeft: "10px",
              }}
            >
              SheMatters
            </Typography>

            <IconButton
              onClick={toggleDrawer(true)}
              sx={{
                color: "primary.main",
                marginRight: "10px",
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
                width: 220,
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
                component={Link}
                to="/clinician/dashboard/"
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
              component={Link}
              to="/clinician/dashboard/consultations"
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
              {/* <Button
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <GroupRoundedIcon
                  sx={{ marginRight: "10px", marginBottom: "3px" }}
                />
                Group Therapy
              </Button> */}
              
              <Button
                onClick={handleDropdownOpen}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <LibraryBooksRoundedIcon
                  sx={{ marginRight: "10px", marginBottom: "3px" }}
                />
                Patients
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={isDropdownOpen}
                onClose={handleDropdownClose}
                sx={{
                  marginLeft: "10px",
                }}
              >
                <MenuItem
                  sx={{
                    "&:hover": {
                      backgroundColor: "primary.light",
                      borderRadius: "6px",
                    },
                  }}
                  component={Link}
                  to={`/clinician/dashboard/patients-with-journals/${psychologistId}`}
                >
                  <Typography variant="h5" color="primary.main" sx={{ fontSize: "0.8rem", fontWeight: "600", textTransform: "Uppercase" }}>
                    View Patients
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
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
              <Button onClick={handleLogout} component={Link} to="/">
                Log Out
              </Button>

              <Button
                component={Link}
                to="/dashboard/accountInfo"
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
              width: 230,
              backgroundColor: "white.main",
              padding: "20px",
              borderWidth: "0",
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
            component={Link}
                to="/clinician/dashboard/"
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
            component={Link}
            to="/clinician/dashboard/consultations"
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
            {/* <Button
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <GroupRoundedIcon
                sx={{ marginRight: "10px", marginBottom: "3px" }}
              />
              Group Therapy
            </Button> */}
            
            <Button
            component={Link}
            to={`/clinician/dashboard/patients-with-journals/${psychologistId}`}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <LibraryBooksRoundedIcon
                sx={{ marginRight: "10px", marginBottom: "3px" }}
              />
              View Patients
            </Button>
          </Box>
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
              to="/clinician/dashboard/accountInfo"
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
