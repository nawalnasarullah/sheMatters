import React from 'react';
import ChatSidebar from '../../components/ChatSideBar';
import { ThemeProvider } from '@emotion/react';
import theme from '../../components/Theme';
import ChatContainer from '../../components/ChatContainer';
import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import VideoCallModal from '../../components/VideoCallModal';

function UserConsultingPage() {
  const { user: data } = useSelector((state) => state.auth);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const user = data.user;
  const isSmallOrMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
    
        {(!selectedUser || !isSmallOrMediumScreen) && (
          <Box
            sx={{
              width: isSmallOrMediumScreen && !selectedUser ? '100%' : '250px',
              flexShrink: 0,
              borderRight: '1px solid',
              borderColor: 'grey.300',
            }}
          >
            <ChatSidebar user={user} />
          </Box>
        )}

 
        <Box
          sx={{
            flexGrow: 1,
            width: isSmallOrMediumScreen && selectedUser ? '100%' : 'calc(100% - 250px)',
            transition: 'width 0.3s ease',
          }}
        >
          <ChatContainer user={user} />
          <VideoCallModal user={user} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default UserConsultingPage;