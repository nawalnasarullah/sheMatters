import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPsychologistByIdQuery } from "../../redux/api/psychologistApi";
import {
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Avatar,
  ThemeProvider,
  Box,
} from "@mui/material";
import Pill from "../user/Pill";
import theme from "../../components/Theme";

export default function PsychologistProfile() {
  const { id } = useParams(); // Get the psychologist ID from the URL params
  const navigate = useNavigate();

  // Fetch psychologist details by ID
  const { data, isLoading, isError } = useGetPsychologistByIdQuery(id);

  useEffect(() => {
    if (isError) {
      alert("Failed to load psychologist profile");
      navigate("/");
    }
  }, [isError, navigate]);

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <CircularProgress />
      </div>
    );
  }

  const psychologist = data?.psychologist;

  return (
    <ThemeProvider theme={theme}>
      <Card className="border rounded-lg mx-10">
        <CardContent>
          <div className="flex gap-5 items-center mb-5">
            <Avatar
              src={psychologist?.avatar || "/default-avatar.png"}
              alt={`${psychologist?.firstName} ${psychologist?.lastName}`}
              sx={{ width: 80, height: 80 }}
            />
            <Typography
              variant="h5"
              color="primary.main"
              sx={{ fontWeight: 600 }}
            >
              {psychologist?.firstName} {psychologist?.lastName}
            </Typography>
          </div>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              sx={{ fontSize: "1.2rem" }}
              variant="h5"
              color="textSecondary"
              gutterBottom
            >
              Username:
            </Typography>

            <Typography
              sx={{ fontSize: "1.2rem" }}
              variant="h5"
              color="primary.main"
              gutterBottom
            >
              {psychologist?.username}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              sx={{ fontSize: "1.2rem" }}
              variant="h5"
              color="textSecondary"
              gutterBottom
            >
              Email:
            </Typography>

            <Typography
              sx={{ fontSize: "1.2rem" }}
              variant="h5"
              color="primary.main"
              gutterBottom
            >
              {" "}
              {psychologist?.email}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              sx={{ fontSize: "1.2rem" }}
              variant="h5"
              color="textSecondary"
              gutterBottom
            >
              Phone Number:
            </Typography>

            <Typography
              sx={{ fontSize: "1.2rem" }}
              variant="h5"
              color="primary.main"
              gutterBottom
            >
              {psychologist?.phoneNumber || "N/A"}
            </Typography>
          </Box>

          <div className="mt-5">
            <Typography
              variant="h5"
              color="primary.main"
              sx={{ marginBottom: "10px", fontSize: "1.4rem" }}
            >
              Specializations:
            </Typography>
            {psychologist?.labels?.length > 0 ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {psychologist.labels.map((label, index) => (
                  <Pill value={label} key={index} />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No specializations available.
              </Typography>
            )}
          </div>

          <div className="mt-5">
            <Typography
              variant="h5"
              color="primary.main"
              sx={{ marginBottom: "10px", fontSize: "1.4rem" }}
            >
              Availability:
            </Typography>
            <Typography
              sx={{ fontSize: "1.2rem" }}
              variant="h5"
              color="textSecondary"
            >
              {`Available from ${
                psychologist?.availability?.startHour || "9"
              }:00 to ${psychologist?.availability?.endHour || "15"}:00`}
            </Typography>
          </div>

          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            sx={{
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.hover" },
              color: "white",
              py: 1,
              px: 4,
              textTransform: "uppercase",
              borderRadius: 1,
              mt: 3,
            }}
          >
            Back
          </Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
