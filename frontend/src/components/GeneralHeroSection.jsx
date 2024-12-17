import { ThemeProvider } from "@emotion/react";
import theme from "./Theme";
import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function GeneralHeroSection({ heading1, heading2, heading3, content, buttonText, buttonLink, imgSrc, footerText }) {
  return (
    <ThemeProvider theme={theme}>
      <div className="w-full">
        <div className="grid lg:grid-cols-2">
          {/* Left Column */}
          <div className="bg-secondary flex items-center justify-center">
            <Container>
              <div className="flex flex-col space-y-6 p-16">
                <Typography
                  variant="h1"
                  color="primary.main"
                  sx={{
                    fontSize: { xs: "30px", md: "30px", lg: "40px" },
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {heading1}{" "}
                  <span className="block">{heading2}</span>{" "}
                  <span className="block">
                    <b>{heading3}</b>
                  </span>
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "16px",
                    lineHeight: 1.5,
                    maxWidth: "90%",
                  }}
                >
                  {content}
                </Typography>

                <div className="flex items-center space-x-4 pt-4">
                  <Button
                    component={Link}
                    to={buttonLink}
                    variant="contained"
                    sx={{
                      backgroundColor: "primary.main",
                      "&:hover": {
                        backgroundColor: "primary.hover",
                      },
                      color: "white",
                      padding: "8px 24px",
                      fontSize: "14px",
                      textTransform: "uppercase",
                      borderRadius: "4px",
                    }}
                  >
                    {buttonText}
                  </Button>
                </div>
              </div>
            </Container>
          </div>

          {/* Right Column */}
          <div>
            <img src={imgSrc} alt="Hero" className="w-full px-14 pt-6" />
          </div>
        </div>
      </div>
      {footerText && (
        <div className="bg-primary p-8">
          <Container>
            <Typography
              className="flex md:flex-row flex-col items-center justify-center"
              variant="h5"
              color="white"
              sx={{ fontSize: "20px", fontWeight: 400, lineHeight: 1.2 }}
            >
              {footerText}
            </Typography>
          </Container>
        </div>
      )}
    </ThemeProvider>
  );
}

export default GeneralHeroSection;
