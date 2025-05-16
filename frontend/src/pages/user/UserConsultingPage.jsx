import React from 'react'
import ChatSidebar from '../../components/ChatSideBar';
import { ThemeProvider } from '@emotion/react';
import theme from '../../components/Theme';
import ChatContainer from '../../components/ChatContainer';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

function UserConsultingPage() {

   const { user: data } = useSelector((state) => state.auth);

   const user = data.user;
   
   
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

export default UserConsultingPage;