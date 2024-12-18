import React, { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import {
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { benefits } from "./Data";
import theme from "./Theme";
import { Card, CardContent } from "@mui/material";

function BenefitsSheMatters() {
  const [weeklyHours, setWeeklyHours] = useState(40);

  const calculateEarnings = (hours) => {
    const hourlyRate = 74.42; // Base calculation rate
    const weeksPerYear = 52;
    return Math.round(hours * hourlyRate * weeksPerYear);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ pt:8, pb:4 }}>
        <Box
          sx={{
            display: "grid",
            gap: 6,
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            px: 4,
          }}
        >
          {/* Left Column */}
          <Box>
            <Typography
              variant="h1"
              color="primary.main"
              sx={{
                fontSize: "40px",
                fontWeight: 400,
                lineHeight: 1.2,
                mb: 4,
              }}
            >
              Benefits of <b>SheMatters</b>
            </Typography>

            <div className="space-y-6 max-w-md">
              {benefits.map((benefit) => (
                <Card className="reason-card border shadow-sm rounded-lg">
                  <CardContent>
                    <Typography
                      variant="h6"
                      color="primary.main"
                      sx={{ fontWeight: 600 }}
                    >
                      {benefit.icon} {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Box>

          {/* Right Column */}
          <Box sx={{ bgcolor: "secondary.main", p: 4, borderRadius: 2 }}>
            <Typography
              variant="h6"
              align="center"
              color="primary.main"
              sx={{
                fontSize: "32px",
                fontWeight: 700,
                lineHeight: 1.3,
                mb: 4,
              }}
            >
              As a SheMatters therapist you can earn an estimated
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Box sx={{ width: "100%", maxWidth: "xs" }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 0.5,
                    color: "primary.main",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  Weekly hours
                </Typography>
                <Select
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  fullWidth
                  sx={{
                    bgcolor: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.dark",
                    },
                  }}
                >
                  {[20, 30, 40, 50].map((hours) => (
                    <MenuItem key={hours} value={hours}>
                      {hours}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <Typography
                variant="h1"
                color="primary.main"
                sx={{
                  fontSize: "48px",
                  fontWeight: 500,
                }}
              >
                ${calculateEarnings(weeklyHours).toLocaleString()}
              </Typography>

              <Button
                component={Link}
                to="/loginPsychologist"
                variant="contained"
                sx={{
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.hover",
                  },
                  color: "white",
                  py: 1.5,
                  px: 4,
                  textTransform: "uppercase",
                  borderRadius: 1,
                  width: "100%",
                  maxWidth: "320px",
                }}
              >
                Apply now
              </Button>

              <Typography
                variant="h1"
                sx={{
                  color: "primary.main",
                  fontSize: "14px",
                  fontWeight: 400,
                  "&:hover" : {
                    color: "primary.hover",
                    cursor: "pointer"
                  }
                }}
              >
                Learn how we estimate your earnings
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default BenefitsSheMatters;
