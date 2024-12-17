import React from "react";
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
                  value=""
                  InputLabelProps={{
                    shrink: true, // Ensures the label stays above the input
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        sx={{ "&:hover": { backgroundColor: "primary.light" } }}
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

                      //  "& fieldset": {
                      //     borderColor: "primary.main",
                      //  },
                      "&:hover fieldset": {
                        borderColor: "primary.dark",
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: "12px",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "15px",
                    },
                    "& .MuiInputLabel-root": {
                      color: "primary.main",
                    },
                  }}
                />
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value=""
                  InputLabelProps={{
                    shrink: true, // Ensures the label stays above the input
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        sx={{ "&:hover": { backgroundColor: "primary.light" } }}
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

                      //  "& fieldset": {
                      //     borderColor: "primary.main",
                      //  },
                      "&:hover fieldset": {
                        borderColor: "primary.dark",
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: "12px",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "15px",
                    },
                    "& .MuiInputLabel-root": {
                      color: "primary.main",
                    },
                  }}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value=""
                  InputLabelProps={{
                    shrink: true, // Ensures the label stays above the input
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        sx={{ "&:hover": { backgroundColor: "primary.light" } }}
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

                      //  "& fieldset": {
                      //     borderColor: "primary.main",
                      //  },
                      "&:hover fieldset": {
                        borderColor: "primary.dark",
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: "12px",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "15px",
                    },
                    "& .MuiInputLabel-root": {
                      color: "primary.main",
                    },
                  }}
                />
              </Grid>

              {/* Phone Number */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value=""
                  InputLabelProps={{
                    shrink: true, // Ensures the label stays above the input
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        sx={{ "&:hover": { backgroundColor: "primary.light" } }}
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

                      //  "& fieldset": {
                      //     borderColor: "primary.main",
                      //  },
                      "&:hover fieldset": {
                        borderColor: "primary.dark",
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: "12px",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "15px",
                    },
                    "& .MuiInputLabel-root": {
                      color: "primary.main",
                    },
                  }}
                />
              </Grid>

              {/* Date of Birth */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Date of Birth"
                  variant="outlined"
                  fullWidth
                  value=""
                  InputLabelProps={{
                    shrink: true, // Ensures the label stays above the input
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        sx={{ "&:hover": { backgroundColor: "primary.light" } }}
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

                      //  "& fieldset": {
                      //     borderColor: "primary.main",
                      //  },
                      "&:hover fieldset": {
                        borderColor: "primary.dark",
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: "12px",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "15px",
                    },
                    "& .MuiInputLabel-root": {
                      color: "primary.main",
                    },
                  }}
                />
              </Grid>

              {/* Country */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Country"
                  variant="outlined"
                  fullWidth
                  value=""
                  InputLabelProps={{
                    shrink: true, // Ensures the label stays above the input
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        sx={{ "&:hover": { backgroundColor: "primary.light" } }}
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

                      //  "& fieldset": {
                      //     borderColor: "primary.main",
                      //  },
                      "&:hover fieldset": {
                        borderColor: "primary.dark",
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: "12px",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "15px",
                    },
                    "& .MuiInputLabel-root": {
                      color: "primary.main",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default AccountInformation;
