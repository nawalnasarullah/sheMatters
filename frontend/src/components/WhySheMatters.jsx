import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "./Theme";
import { Container } from "@mui/material";
import { reasons } from "./Data";
import MediaSection from "./MediaSection";

function WhySheMatters() {
  return (
    <ThemeProvider theme={theme}>
      <Container className="mt-12 mb-4">
        <Typography
          className="flex md:flex-row flex-col items-center justify-center"
          variant="h2"
          color="primary.main"
          sx={{
            fontSize: " 40px",
            fontWeight: 400,
            lineHeight: 1.2,
            marginTop: "18px",
          }}
        >
          Why
          <span className="ml-3 font-bold ">SheMatters?</span>
        </Typography>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 px-4">
          {/* Text Section */}
          <div className="space-y-6 max-w-md">
            {reasons.map((reason) => (
              <Card key={reason.id} className="reason-card border shadow-sm rounded-lg">
                <CardContent>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    sx={{ fontWeight: 600 }}
                  >
                    {reason.id}. {reason.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {reason.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Image Section */}
          <div className="relative">
            <img className="w-[90%]" src="/images/Psychologist.gif" alt="" />
          </div>
        </div>
      </Container>
      <MediaSection/>
    </ThemeProvider>
  );
}

export default WhySheMatters;
