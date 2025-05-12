import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import ProfileNav from "./ProfileNav";
import { Box, ThemeProvider } from "@mui/material";
import { menuItemsSidebar } from "./Data";
import theme from "./Theme";

function DashboardLayout() {
  const location = useLocation();

  const shouldHideLayout =
    location.pathname === "/dashboard/user/consultations";

  return (
    <>
      <ThemeProvider theme={theme}>
        {!shouldHideLayout && <SideBar menuItemsSidebar={menuItemsSidebar} />}
        {!shouldHideLayout && <ProfileNav />}
        <Box
          className={`pt-[20px] pb-[20px] ${
            !shouldHideLayout ? "ps-[20px] md:ps-[270px] pr-[33px] bg-lightGrey" : ""
          }`}
        >
          <Outlet />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default DashboardLayout;
