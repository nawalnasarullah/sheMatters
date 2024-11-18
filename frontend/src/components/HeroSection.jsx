import { ThemeProvider } from "@emotion/react";
import theme from "./Theme";
import React from "react";
import { Container, Typography } from "@mui/material";
import TherapyCard from "./TherapyCard";
import { useSelector } from "react-redux";

function HeroSection() {
  
  const {isAuthenticated, user} = useSelector(state => state.auth);
  
  return (
    <ThemeProvider theme={theme}>
      <Container className="mt-12 mb-4">
        <Typography
          className="flex md:flex-row flex-col items-center justify-center"
          variant="h2"
          color="primary.main"
          sx={{ fontSize: " 40px", fontWeight: 400, lineHeight: 1.2 }}
        >
          Empowering Women's
          <span className="ml-2 font-bold">Mental Health</span>
        </Typography>

       {isAuthenticated ?  <Typography
          className="flex md:flex-row flex-col items-center justify-center mt-3"
          variant="h2"
          color="primary.main"
          sx={{ fontSize: " 30px", fontWeight: 400, lineHeight: 1.2 }}
        >
          Welcome 
          <span className="ml-2 font-bold"> {user?.user?.firstName} {user?.user?.lastName}!</span>
        </Typography> : null}

        <TherapyCard />
      </Container>
      <div className="bg-primary mt-12 p-8">
        <Container>
          <Typography
            className="flex md:flex-row flex-col items-center justify-center"
            variant="h5"
            color="white"
            sx={{ fontSize: " 20px", fontWeight: 400, lineHeight: 1.2 }}
          >
            Start a journey towards self-care and growth.
          </Typography>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default HeroSection;
