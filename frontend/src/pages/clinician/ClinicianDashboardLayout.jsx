import React from "react";
import { Outlet } from "react-router-dom";
import ClinicianSideBar from "./ClinicianSideBar.jsx"
import ClinicianProfileNav from "./ClinicianProfileNav.jsx";
import { Box, ThemeProvider } from "@mui/material";
import theme from "../../components/Theme.jsx";
import ClinicianProfileSetupReminder from "./ClinicianProfileSetupReminder.jsx";

function ClinicianDashboardLayout() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ClinicianSideBar />
        <ClinicianProfileNav />
        <Box className="ps-[20px] md:ps-[270px] pr-[33px] pt-[20px] pb-[20px] bg-lightGrey">
          <Outlet />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default ClinicianDashboardLayout;
