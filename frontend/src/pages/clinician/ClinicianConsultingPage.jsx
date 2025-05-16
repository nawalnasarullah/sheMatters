import React from 'react'
import ChatSidebar from '../../components/ChatSideBar';
import { ThemeProvider } from '@emotion/react';
import theme from '../../components/Theme';
import ChatContainer from '../../components/ChatContainer';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

function ClinicianConsultingPage() {

   const { psychologist } = useSelector((state) => state.psychologistAuth);

   console.log('psychologist', psychologist);
   
   const user = psychologist;

   
  return (
    <>
    <ThemeProvider theme={theme}>
      <ChatSidebar />

      <Box className="ps-[14px] md:ps-[230px] ">
        <ChatContainer user={user} />
      </Box>
    </ThemeProvider>

    </>
  )
}

export default ClinicianConsultingPage;