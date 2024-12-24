import React from "react"
import { useSelector } from "react-redux"
import { Typography } from "@mui/material"
import { Card, CardContent, Button, CircularProgress } from "@mui/material"
import { Link } from "react-router-dom"
import { isQuestionnaireComplete, isProfileComplete } from "../utils/utils"
import { useGetRecommendedPyschologistsQuery } from "../redux/api/psychologistAuthApi"

export default function UserDashboardMain() {
  return (
    <section className="user-dashboard-main ">
      <ProfileSetupReminder />
      <PyschologistRecommendations />
    </section>
  )
}

const ProfileSetupReminder = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  if (!isAuthenticated)
    // wow what a nice code man
    return <></>

  const questionnaireComplete = isQuestionnaireComplete(user?.user)
  const profileComplete = isProfileComplete(user?.user)
  console.log("profileComplete", profileComplete)
  return (
    <div className="grid grid-cols-2 gap-5">
      {!profileComplete ? (
        <Card className="border rounded-lg text-center">
          <Link href="/">
            <CardContent>
              <Typography
                variant="h6"
                color="primary.main"
                sx={{ fontWeight: 600, marginBottom: "10px" }}
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
      ) : (
        <></>
      )}
      {!questionnaireComplete ? (
        <Card className="border rounded-lg text-center">
          <Link href="/questionnaire">
            <CardContent>
              <Typography
                variant="h6"
                color="primary.main"
                sx={{ fontWeight: 600, marginBottom: "10px" }}
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
      ) : (
        <></>
      )}
    </div>
  )
}

const PyschologistRecommendations = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { data , isLoading , isSuccess , isError} = useGetRecommendedPyschologistsQuery({ _id: user?.user?._id })

  if(isError){
    return (
        <Typography variant="h5" color="textSecondary">
            No recommendations available.
        </Typography>
    )
  }

  if(isLoading){

    return (
        <div className="text-center py-10">
            <CircularProgress sx={{marginBlock : 'center'}} />
        </div>
    
    )
  }

  return (
    <>
      <Typography
        variant="h6"
        color="primary.main"
        sx={{ fontWeight: 600, marginBottom: "10px" }}
      >
        Psychologist Recommendations
      </Typography>
      {data.psychologists && data.psychologists.length > 0 ? (
        data.psychologists.map((psychologist) => (
          <Card
            key={psychologist._id}
            className="border rounded-lg text-start"
            sx={{ marginBottom: "10px" }}
          >
            <CardContent>
              <Typography variant="h6" color="textPrimary">
                {psychologist.firstName} {psychologist.lastName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Email: {psychologist.email}
              </Typography>
              <div className="flex gap-3 items-center mt-5">
                Specialization: {psychologist.labels.map((commonLabel,ind) => <Pill value={commonLabel} key={ind} /> )}
              </div>
              <div className="flex gap-3 items-center mt-5">
                {
                    psychologist.commonLabels.length === 0 ?
                    "No common labels"
                    :
                    <>Common Labels: {psychologist.commonLabels.map((commonLabel,ind) => <Pill value={commonLabel} key={ind} /> )}</>
                }
              </div>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "primary.main",
                  "&:hover": { bgcolor: "primary.hover" },
                  color: "white",
                  py: 1,
                  px: 4,
                  textTransform: "uppercase",
                  borderRadius: 1,
                  mt: 2,
                }}
              >
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary">
          No recommendations available.
        </Typography>
      )}
    </>
  )
}


const Pill = ({value}) => {
    return (
        <div className="bg-[#FCEAEA] rounded-full px-4 py-1 flex items-center">
            <Typography variant="body1"  fontWeight="bold" className="capitalize ">{value.replace(/_/g, ' ')}</Typography>
        </div>
    )
} 