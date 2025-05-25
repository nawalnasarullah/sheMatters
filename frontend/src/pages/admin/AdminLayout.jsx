import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../../components/SideBar";
import ProfileNav from "../../components/ProfileNav";
import { Box, ThemeProvider } from "@mui/material";
import theme from "../../components/Theme";
import { adminMenuItemsSidebar } from "../../components/Data";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "../../redux/api/adminApi";


function AdminLayout() {

    const { data } = useGetMeQuery();
    const { admin, isAuthenticated } = useSelector((state) => state.admin);
    console.log("admin", admin, isAuthenticated);

    const adminId = admin?._id
    

  return (
    <>
      <ThemeProvider theme={theme}>
        <SideBar menuItemsSidebar={adminMenuItemsSidebar} adminId={adminId} />
        <ProfileNav />
        <Box
          className={
            "pt-[20px] pb-[20px] ps-[20px] md:ps-[270px] pr-[33px] bg-lightGrey"
          }
        >
          <Outlet />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default AdminLayout;
