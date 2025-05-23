import React from 'react'
import { isProfileComplete } from '../../utils/utils'
import { useSelector } from 'react-redux'
import { Card, CardContent } from "@mui/material";
import {
    Button,
    Typography,
  } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeProvider } from '@emotion/react';
import theme from '../../components/Theme'

const ClinicianProfileSetupReminder = () => {

    const {isAuthenticated, psychologist} = useSelector(state => state.psychologistAuth)
    if(!isAuthenticated) // wow what a nice code man
    return <></>

    const profileComplete = isProfileComplete(psychologist)
    console.log('profileComplete', profileComplete)
    return (
        <ThemeProvider theme={theme}>
            <div className="max-w-[500px] mx-auto gap-5">
        
        {
            !profileComplete ? 
            <Card className="border rounded-lg text-center">
                <Link href="/">
                    <CardContent>
                    <Typography
                        variant="h5"
                        color="primary.main"
                        sx={{ fontWeight: 400 , marginBottom : '10px', fontSize: "1.2rem" }}
                    >
                        Complete your profile to get started
                    </Typography>
                    <Button
                        component={Link}
                        to="/clinician/dashboard/accountInfo"
                        variant="contained"
                        sx={{
                        bgcolor: "primary.main",
                        "&:hover": {
                            bgcolor: "primary.hover",
                        },
                        color: "white",
                        py: 1,
                        px: 4,
                        textTransform: "uppercase",
                        borderRadius: 1,
                        width: "100%",
                        maxWidth: "200px",
                        }}
                    >
                        Setup Profile
                    </Button>
                    </CardContent>
                </Link>
            </Card>
            :
            <></>
        }

        </div>
        </ThemeProvider>
    )
}

export default ClinicianProfileSetupReminder