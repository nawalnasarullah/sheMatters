import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import ProfileNav from "./ProfileNav";
import { Box, ThemeProvider } from "@mui/material";
import theme from "./Theme";

function DashboardLayout() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SideBar />
        <ProfileNav />
        <Box className="ps-[20px] md:ps-[270px] pr-[33px] pt-[20px] pb-[20px] bg-lightGrey">
          <Outlet />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default DashboardLayout;
