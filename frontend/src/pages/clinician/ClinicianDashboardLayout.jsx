import React from "react";
import { Outlet } from "react-router-dom";
import ClinicianSideBar from "./ClinicianSideBar.jsx"
import ProfileNav from "../../components/ProfileNav.jsx";
import { Box, ThemeProvider } from "@mui/material";
import theme from "../../components/Theme.jsx";

function ClinicianDashboardLayout() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ClinicianSideBar />
        <ProfileNav />
        <Box className="ps-[20px] md:ps-[270px] pr-[33px] pt-[20px] pb-[20px] bg-lightGrey">
          <Outlet />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default ClinicianDashboardLayout;
