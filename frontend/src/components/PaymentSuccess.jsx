import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Typography, CircularProgress, ThemeProvider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled, keyframes } from "@mui/system";
import theme from "./Theme";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "70vh",
  textAlign: "center",
  animation: `${fadeIn} 0.6s ease-out`,
  padding: theme.spacing(4),
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(7),
    marginTop: theme.spacing(9),
    marginBottom: theme.spacing(9),
    marginLeft: theme.spacing(18),
    marginRight: theme.spacing(18),
  },
}));

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Appointment booked successfully!");
    const timer = setTimeout(() => navigate("/dashboard"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <CheckCircleIcon sx={{ fontSize: 80, color: "primary.main", mb: 2 }} />
        <Typography variant="h4" sx={{ fontFamily: "Signika", fontWeight: 600, color: "primary.darker" }}>
          Payment Successful 🎉
        </Typography>
        <img
          src="/images/celeb.svg"
          alt="Success"
          className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] my-4 animate-bounce"
        />
        <Typography variant="body1" sx={{ mt: 1, color: "grey.brownish" }}>
          Your appointment has been booked. Redirecting to your dashboard...
        </Typography>
        <CircularProgress color="primary" sx={{ mt: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
