import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "./Theme";
import { Container } from "@mui/material";
import { reasons } from "./Data";

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
              <Card key={reason.id} className="border shadow-sm rounded-lg">
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
      <div className="bg-primary mt-12 p-8">
        <Container>
          <Typography
            className="flex md:flex-row flex-col items-center justify-center"
            variant="h5"
            color="white"
            sx={{ fontSize: " 20px", fontWeight: 400, lineHeight: 1.2 }}
          >
            Mental Health Matters{" "}
            <span className="ml-2 font-semibold italic">SheMatters</span>
          </Typography>
        </Container>
      </div>
      <Container className="mt-12 mb-4">
        <div className="flex flex-col lg:flex-row items-center justify-center px-4">
          {/* Image Section */}
          <div className="relative">
            <img className="w-[90%]" src="/images/Anxiety.gif" alt="" />
          </div>
          {/* Text Section */}
          <div className="space-y-6 max-w-[350px]">
            <Typography
              variant="h2"
              color="primary.main"
              sx={{ fontWeight: 600, display: "flex", flexDirection: "column" }}
            >
              <span className="ml-2">IT'S</span>
              <span className="ml-2">OKAY</span>
              <span className="ml-2">TO ASK</span>
              <span className="ml-2">FOR</span>
              <span className="ml-2">HELP</span>
              <span className="ml-2 text-[19px]">
                You don't have to fight your battle alone. Talk to us.
              </span>
            </Typography>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default WhySheMatters;
