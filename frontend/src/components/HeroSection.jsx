import { ThemeProvider } from "@emotion/react";
import theme from "./Theme";
import React from "react";
import { Container, Typography } from "@mui/material";
import TherapyCard from "./TherapyCard";

function HeroSection() {
  return (
    <ThemeProvider theme={theme}>
      <Container className="mt-12">
        <Typography
          className="flex md:flex-row flex-col items-center justify-center"
          variant="h2"
          color="primary.main"
          sx={{ fontSize: " 40px", fontWeight: 400, lineHeight: 1.2 }}
        >
          Empowering Women's
          <span className="ml-2 font-bold">Mental Health</span>
        </Typography>

        <TherapyCard />
      </Container>
      <div className="bg-primary mt-8 p-8">
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
