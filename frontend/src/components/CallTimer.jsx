import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

export default function CallTimer({ isCallActive }) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    let timer;
    if (isCallActive) {
      timer = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    } else {
      setSecondsElapsed(0); // Reset when call ends
    }

    return () => clearInterval(timer);
  }, [isCallActive]);

  return (
        isCallActive && (
            <Typography sx= {{ color : "primary.main" , textAlign : 'center' , fontWeight : 'bold',    mt: { xs: 26, sm: 0 },  }}>
                 Call Duration <br />
              {formatTime(secondsElapsed)}
            </Typography>
        )
  );
}
