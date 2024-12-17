import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "./Theme";
import { Container } from "@mui/material";
import MediaSection from "./MediaSection";

function WhySheMatters({ title, highlight, data, imageSrc, showMediaSection = true }) {
  return (
    <ThemeProvider theme={theme}>
      <Container className="mt-12 mb-4">
        <Typography
          className="flex md:flex-row flex-col items-center justify-center"
          variant="h2"
          color="primary.main"
          sx={{
            fontSize: "40px",
            fontWeight: 400,
            lineHeight: 1.2,
            marginTop: "18px",
          }}
        >
          {title}
          <span className="ml-3 font-bold">{highlight}</span>
        </Typography>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 px-4">
          {/* Text Section */}
          <div className="space-y-6 max-w-md">
            {data.map(({ id, title, description }) => (
              <Card
                key={id}
                className="reason-card border shadow-sm rounded-lg"
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    sx={{ fontWeight: 600 }}
                  >
                    {id}. {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Image Section */}
          <div className="relative">
            <img className="w-[90%]" src={imageSrc} alt="Illustration" />
          </div>
        </div>
      </Container>
      {showMediaSection && <MediaSection />}
    </ThemeProvider>
  );
}

export default WhySheMatters;
