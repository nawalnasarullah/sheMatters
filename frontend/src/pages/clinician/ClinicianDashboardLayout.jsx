import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ClinicianSideBar from "./ClinicianSideBar.jsx";
import ClinicianProfileNav from "./ClinicianProfileNav.jsx";
import { Box, ThemeProvider } from "@mui/material";
import theme from "../../components/Theme.jsx";
import ClinicianProfileSetupReminder from "./ClinicianProfileSetupReminder.jsx";
import { useSelector } from "react-redux"; 
import { isProfileComplete } from "../../utils/utils"; 

function ClinicianDashboardLayout() {
  const { isAuthenticated, psychologist } = useSelector(state => state.psychologistAuth);
  const location = useLocation(); 

  // if (!isAuthenticated) return <></>; 

  const profileComplete = isProfileComplete(psychologist); // Check if profile is complete

  // Check if the current route is the profile page (or any relevant page)
  const isProfilePage = location.pathname.includes("/clinician/dashboard/accountInfo");

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="relative">
    
          {!profileComplete && !isProfilePage && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-gray-700 opacity-50 z-10"
              style={{ pointerEvents: "all" }}
            />
          )}

     
          <div className={`${(!profileComplete && !isProfilePage) ? "pointer-events-none" : ""}`}>
            <ClinicianSideBar />
          </div>
          
          <div className={`${(!profileComplete && !isProfilePage) ? "pointer-events-none" : ""}`}>
            <ClinicianProfileNav />
          </div>

          {/* Main Content */}
          <Box className="ps-[20px] md:ps-[270px] pr-[33px] pt-[20px] pb-[20px] bg-lightGrey">
            {!profileComplete && !isProfilePage && (
              <div className="fixed top-0 left-0 w-full h-full z-20 flex justify-center items-center">
                <ClinicianProfileSetupReminder />
              </div>
            )}
            <Outlet />
          </Box>
        </div>
      </ThemeProvider>
    </>
  );
}

export default ClinicianDashboardLayout;
