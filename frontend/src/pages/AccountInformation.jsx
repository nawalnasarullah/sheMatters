import React, { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Grid,
  ThemeProvider,
  Container,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import theme from "../components/Theme";

function AccountInformation() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Typography
          variant="h6"
          color="primary.main"
          fontWeight="bold"
          gutterBottom
        >
          Account Information
        </Typography>
        <div className="rounded-lg shadow-md p-6 bg-white">
          {/* Profile Picture Section */}
          <div className="flex items-center gap-4 mb-6 ">
            <Avatar
              src="/profile.jpg"
              alt="Profile Picture"
              sx={{ width: 80, height: 80 }}
            />
            <IconButton
              sx={{ "&:hover": { backgroundColor: "primary.light" } }}
            >
              <EditRoundedIcon
                sx={{
                  "&:hover": {
                    color: "primary.main",
                    transition: "0.3s",
                  },
                }}
              />
            </IconButton>
          </div>

          {/* Input Fields Section */}
          <Box>
            <Grid container spacing={3}>
              {/* First Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        sx={{
                          "&:hover": { backgroundColor: "primary.light" },
                        }}
                      >
                        <EditRoundedIcon
                          sx={{
                            fontSize: "20px",
                            "&:hover": {
                              color: "primary.main",
                              transition: "0.3s",
                            },
                          }}
                        />
                      </IconButton>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&:hover fieldset": {
                        borderColor: "primary.dark",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "white", // Keeps background white when focused
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: "12px",
                      backgroundColor: "white", // Ensures the input always has a white background
                      "&:focus": {
                        backgroundColor: "white", // Keeps white background when typing
                      },
                      "&:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0px 1000px white inset", // Forces white background for autofill
                        backgroundColor: "white !important", // Ensures autofill stays white
                      },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "15px",
                      color: "primary.main",
                    },
                  }}
                />
              </Grid>

              {/* Repeat for other fields */}
              {/* Last Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        sx={{
                          "&:hover": { backgroundColor: "primary.light" },
                        }}
                      >
                        <EditRoundedIcon
                          sx={{
                            fontSize: "20px",
                            "&:hover": {
                              color: "primary.main",
                              transition: "0.3s",
                            },
                          }}
                        />
                      </IconButton>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&:hover fieldset": {
                        borderColor: "primary.dark",
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: "12px",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "15px",
                      color: "primary.main",
                    },
                  }}
                />
              </Grid>
              {/* Add other fields similarly */}
            </Grid>
          </Box>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default AccountInformation;
