import { ThemeProvider } from "@emotion/react";
import theme from "./Theme";
import React from "react";
import { Container, Typography } from "@mui/material";
import TherapyCard from "./TherapyCard";
import { useSelector } from "react-redux";


function HeroSection() {

  const userAuth = useSelector((state) => state.auth);
  const psychologistAuth = useSelector((state) => state.psychologistAuth);
  const adminAuth = useSelector((state) => state.admin);

  const isUserAuthenticated = userAuth.isAuthenticated;
  const isPsychologistAuthenticated = psychologistAuth.isAuthenticated;
  const isAdminAuthenticated = adminAuth.isAuthenticated;

  const user = userAuth.user?.user;
  const psychologist = psychologistAuth.psychologist;
  const admin = adminAuth.admin;

  const currentUser = user || psychologist || admin;
  const firstName = currentUser?.firstName || "";
  const lastName = currentUser?.lastName || "";
  const role = currentUser?.role || "";

  const getGreeting = () => {
    switch (role) {
      case "admin":
        return `Welcome Admin ${firstName} ${lastName}`;
      case "psychologist":
        return `Welcome Dr. ${firstName} ${lastName}`;
      case "user":
        return `Welcome ${firstName} ${lastName}`;
      default:
        return "Welcome!";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="mt-12 mb-4">
        <Typography
          className="flex md:flex-row flex-col items-center justify-center"
          variant="h2"
          color="primary.main"
          sx={{ fontSize: "40px", fontWeight: 400, lineHeight: 1.2 }}
        >
          Empowering Women's
          <span className="ml-2 font-bold">Mental Health</span>
        </Typography>

        {(isUserAuthenticated || isPsychologistAuthenticated || isAdminAuthenticated) ? (
          <Typography
            className="flex md:flex-row flex-col items-center justify-center mt-3"
            variant="h2"
            color="primary.main"
            sx={{ fontSize: "30px", fontWeight: 400, lineHeight: 1.2 }}
          >
            {getGreeting()}
          </Typography>
        ) : null}

        <TherapyCard />
      </Container>

      <div className="bg-primary mt-12 p-8">
        <Container>
          <Typography
            className="flex md:flex-row flex-col items-center justify-center"
            variant="h5"
            color="white"
            sx={{ fontSize: "20px", fontWeight: 400, lineHeight: 1.2 }}
          >
            Start a journey towards self-care and growth.
          </Typography>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default HeroSection;
