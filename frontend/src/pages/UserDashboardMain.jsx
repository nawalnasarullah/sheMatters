import React from 'react'
import { useSelector } from "react-redux";
import { Card, CardContent } from "@mui/material";
import {
    Button,
    Typography,
  } from "@mui/material";
import { Link } from "react-router-dom";
import { isQuestionnaireComplete , isProfileComplete } from '../utils/utils';


export default function UserDashboardMain() {

  return (
    <section className='user-dashboard-main '>
        <ProfileSetupReminder />
    </section>
  )
}

const ProfileSetupReminder = () => {

    const {isAuthenticated, user} = useSelector(state => state.auth);
    if(!user?.user) // wow what a nice code man
    return <></>

    const questionnaireComplete = isQuestionnaireComplete(user?.user)
    const profileComplete = isProfileComplete(user?.user)
    console.log('profileComplete', profileComplete)
    return (
        <div className="grid grid-cols-2 gap-5">
        
        {
            !profileComplete ? 
            <Card className="border rounded-lg text-center">
                <Link href="/">
                    <CardContent>
                    <Typography
                        variant="h6"
                        color="primary.main"
                        sx={{ fontWeight: 600 , marginBottom : '10px'}}
                    >
                        Complete your profile to get started
                    </Typography>
                    <Button
                        component={Link}
                        to="/dashboard/accountInfo"
                        variant="contained"
                        sx={{
                        bgcolor: "primary.main",
                        "&:hover": {
                            bgcolor: "primary.hover",
                        },
                        color: "white",
                        py: 1.5,
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
        {
            !questionnaireComplete ? 
            <Card className="border rounded-lg text-center">
                <Link href="/questionnaire">
                    <CardContent>
                    <Typography
                        variant="h6"
                        color="primary.main"
                        sx={{ fontWeight: 600 , marginBottom : '10px'}}
                    >
                        Complete the Questionnaire to get therapist recommendations
                    </Typography>
                    <Button
                        component={Link}
                        to="/dashboard/user/questionnaire"
                        variant="contained"
                        sx={{
                        bgcolor: "primary.main",
                        "&:hover": {
                            bgcolor: "primary.hover",
                        },
                        color: "white",
                        py: 1.5,
                        px: 4,
                        textTransform: "uppercase",
                        borderRadius: 1,
                        width: "100%",
                        maxWidth: "200px",
                        }}
                    >
                        Fill Questionnaire
                    </Button>
                    </CardContent>
                </Link>
            </Card>
            :
            <></>
        }
        </div>
    )
}
