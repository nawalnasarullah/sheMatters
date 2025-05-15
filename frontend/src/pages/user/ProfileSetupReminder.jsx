import React from "react";
import { useSelector } from "react-redux";
import { Typography, Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { isQuestionnaireComplete, isProfileComplete } from "../../utils/utils";

export default function ProfileSetupReminder() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) return null;

  const questionnaireComplete = isQuestionnaireComplete(user?.user || {});
  const profileComplete = isProfileComplete(user?.user || {});

  return (
    <div className="grid grid-cols-2 gap-5">
      {!profileComplete && (
        <Card className="border rounded-lg text-center">
          <Link to="/">
            <CardContent>
              <Typography
                variant="h5"
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
                  "&:hover": { bgcolor: "primary.hover" },
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
      )}
      {!questionnaireComplete && (
        <Card className="border rounded-lg text-center">
          <Link to="/questionnaire">
            <CardContent>
              <Typography
                variant="h5"
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
                  "&:hover": { bgcolor: "primary.hover" },
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
      )}
    </div>
  );
}
