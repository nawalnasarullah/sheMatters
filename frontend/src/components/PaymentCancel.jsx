import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, ThemeProvider } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
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

export default function PaymentCancel() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/"); // or navigate(-1)
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <CancelIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
        <Typography variant="h4" sx={{ fontFamily: "Signika", fontWeight: 600, color: "error.dark" }}>
          Payment Cancelled ❌
        </Typography>
        <img
          src="/images/cancel.svg"
          alt="Cancelled"
          className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] my-4"
        />
        <Typography variant="body1" sx={{ mt: 1, color: "grey.brownish" }}>
          Your payment was not completed. You can try again or choose another time slot.
        </Typography>
        <Button
          variant="contained"
          onClick={handleBack}
          sx={{
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.hover" },
            color: "white",
            mt: 4,
            px: 4,
            py: 1,
            borderRadius: 1,
            textTransform: "uppercase",
          }}
        >
          Go Back
        </Button>
      </Container>
    </ThemeProvider>
  );
}
