import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Grid,
  Typography,
  Drawer,
  IconButton,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import theme from "./Theme";
import { Link } from "react-router-dom";
import { useGetMeQuery, useLazyLogoutQuery } from "../redux/api/authApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NavBar() {

  const { data } = useGetMeQuery();
  const {user, isAuthenticated} = useSelector(state => state.auth);
  const[logout] = useLazyLogoutQuery();
  const  navigate  = useNavigate();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const res = await logout().unwrap();
    console.log("logout", res);
    navigate(0);
  }

  const open = Boolean(anchorEl);

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white.main",
          boxShadow: "2px",
        }}
      >
        <Container>
          <Toolbar sx={{ padding: "0" }}>
            {/* Mobile size top left therapy button */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                justifyContent: "flex-start",
                flexGrow: 1,
              }}
            >
              <Button
                component={Link}
                to={isAuthenticated ? "/dashboard/" : "/login"}
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.hover",
                  },
                  color: "white.main",
                  padding: "4px 12px",
                  fontSize: "14px",
                }}
              >
                {isAuthenticated ? "Profile" : "Get Therapy"}
              </Button>
            </Box>

            {/* Mobile size centered logo */}
            <Box
              sx={{
                display: { xs: "flex", md: "flex" },
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
                flexGrow: 1,
              }}
            >
              <Typography variant="h5" color="primary.main" sx={{ fontWeight: 600,  lineHeight: 1.2,  letterSpacing: "0.5px", fontSize: "1.6rem", }}>
                SheMatters
              </Typography>
            </Box>

            {/* Mobile size top right toggle drawer button */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                justifyContent: "flex-end",
                flexGrow: 1,
              }}
            >
              <IconButton
                sx={{ color: "primary.main" }}
                onClick={toggleDrawer(true)}
              >
                <MenuRoundedIcon sx={{ width: "1.25em", height: "1.25em" }} />
              </IconButton>
            </Box>

            {/* Desktop */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                onClick={handleMenuOpen}
                aria-controls={open ? "services-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                Services
                <ArrowDropDownRoundedIcon />
              </Button>
              <Menu
                id="services-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                  "aria-labelledby": "services-button",
                }}
                sx={{
                  padding: "20px",
                  position: "absolute",
                  top: "13px",
                  left: "-90px",
                  [theme.breakpoints.down("md")]: {
                    inset: "0",
                  },
                }}
              >
                <Box sx={{ padding: "16px", maxWidth: "700px" }}>
                  <Grid container spacing={2}>
                    {/* Left Side */}
                    <Grid item xs={12} md={7}>
                      <Box
                        sx={{
                          backgroundColor: "#f7faff",
                          padding: "16px",
                          borderRadius: "10px",
                        }}
                      >
                        <Typography variant="h6" fontWeight="bold" mb={1}>
                          Services
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Get access to therapy, medication management, and
                          personalized treatment
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Typography
                        sx={{ paddingLeft: "16px" }}
                        variant="h6"
                        fontWeight="bold"
                        mb={1}
                      >
                        Therapy
                      </Typography>
                      <Box>
                        <MenuItem
                          sx={{
                            "&:hover": {
                              backgroundColor: "primary.light",
                              borderRadius: "6px",
                            },
                          }}
                        >
                          Individual therapy
                        </MenuItem>
                        <MenuItem
                          sx={{
                            "&:hover": {
                              backgroundColor: "primary.light",
                              borderRadius: "6px",
                            },
                          }}
                        >
                          Therapy for mothers
                        </MenuItem>
                        <MenuItem
                          sx={{
                            "&:hover": {
                              backgroundColor: "primary.light",
                              borderRadius: "6px",
                            },
                          }}
                        >
                          Group therapy
                        </MenuItem>
                        <MenuItem
                          sx={{
                            "&:hover": {
                              backgroundColor: "primary.light",
                              borderRadius: "6px",
                            },
                          }}
                        >
                          Unlimited messaging therapy
                        </MenuItem>
                        <MenuItem
                          sx={{
                            "&:hover": {
                              backgroundColor: "primary.light",
                              borderRadius: "6px",
                            },
                          }}
                        >
                          Teen therapy
                        </MenuItem>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Menu>
              <Button
                component={Link}
                to="/clinicians"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 92, 101, 0.04)",
                    cursor: "pointer",
                  },
                }}
              >
                For Clinicians
               
              </Button>
              {/* <Button>For Business</Button> */}
              {isAuthenticated ? <Button onClick={handleLogout} component={Link}
                to="/"
              >Log out</Button> : <Button component={Link}
              to="/login"
            >Log in</Button>}
              <Button
                component={Link}
                to={isAuthenticated ? "/dashboard/" : "/login"}
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.hover",
                  },
                  color: "white",
                }}
              >
                {isAuthenticated ? "Profile" : "Get Therapy"}
              </Button>
            </Box>
          </Toolbar>
        </Container>

        <Drawer
          anchor="top"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              width: "100%",
              backgroundColor: "white.main",
              padding: "16px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              position: "relative",
            }}
          >
            <IconButton
              sx={{ position: "absolute", top: 0, right: 8 }}
              onClick={toggleDrawer(false)}
            >
              <CloseRoundedIcon />
            </IconButton>

            <Button
              onClick={handleMenuOpen}
              aria-controls={open ? "services-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              Services
              <ArrowDropDownRoundedIcon />
            </Button>
            <Button
              component={Link}
              to="/clinicians"
              >
              For Clinicians
              
            </Button>
            {/* <Button>For Business</Button> */}
            {isAuthenticated ? <Button onClick={handleLogout} component={Link}
                to="/">Log Out</Button> : <Button component={Link}
                to="/login">Log in</Button>
            }
            <Button
              component={Link}
              to={isAuthenticated ? "/dashboard/" : "/login"}
              variant="contained"
              sx={{
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.hover",
                },
                color: "white.main",
              }}
            >
              {isAuthenticated ? "Profile" : "Get Therapy"}
            </Button>
          </Box>
        </Drawer>
      </AppBar>
    </ThemeProvider>
  );
}

export default NavBar;
