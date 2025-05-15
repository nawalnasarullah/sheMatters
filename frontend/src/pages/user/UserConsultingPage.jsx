import React from 'react'
import ChatSidebar from '../../components/ChatSideBar';
import { ThemeProvider } from '@emotion/react';
import theme from '../../components/Theme';
import ChatContainer from '../../components/ChatContainer';
import { Box } from '@mui/material';

function UserConsultingPage() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <ChatSidebar />

      <Box className="ps-[14px] md:ps-[230px] ">
        <ChatContainer/>
      </Box>
    </ThemeProvider>

    </>
  )
}

export default UserConsultingPage;