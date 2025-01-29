import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetRecommendedPyschologistsQuery } from "../../redux/api/psychologistAuthApi";
import { Typography, Card, CardContent, Button, CircularProgress } from "@mui/material";
import Pill from "./Pill";

export default function PsychologistRecommendations() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useGetRecommendedPyschologistsQuery({
    _id: user?.user?._id || "",
  });

  if (!isAuthenticated) return null;

  if (isError) {
    return (
      <Typography variant="h5" color="textSecondary">
        No recommendations available.
      </Typography>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <CircularProgress sx={{ marginBlock: "center" }} />
      </div>
    );
  }

  return (
    <>
      <Typography
        variant="h5"
        color="primary.main"
        sx={{ fontWeight: 600, marginBottom: "10px" }}
      >
        Psychologist Recommendations
      </Typography>
      {data?.psychologists && data.psychologists.length > 0 ? (
        data.psychologists.map((psychologist) => (
          <PsychologistCard psychologist={psychologist} key={psychologist._id} />
        ))
      ) : (
        <Typography variant="h5" color="textSecondary">
          No recommendations available.
        </Typography>
      )}
    </>
  );
}

const PsychologistCard = ({ psychologist }) => (
  <Card
    className="border rounded-lg text-start"
    sx={{ marginBottom: "10px" }}
  >
    <CardContent>
      <Typography variant="h5" color="textPrimary" sx={{ fontSize: "20px" }}>
        {psychologist.firstName} {psychologist.lastName}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Email: {psychologist.email}
      </Typography>
      <div className="flex gap-3 items-center mt-5 font-secondaryFont font-semibold" >
        Specialization:{" "}
        {psychologist.labels?.map((label, index) => (
          <Pill value={label} key={index} />
        ))}
      </div>
      <div className="flex gap-3 items-center mt-5 font-secondaryFont font-semibold">
        {!psychologist.commonLabels ||
        psychologist.commonLabels.length === 0 ? (
          "No common labels"
        ) : (
          <>
            Common Labels:{" "}
            {psychologist.commonLabels.map((commonLabel, index) => (
              <Pill value={commonLabel} key={index} />
            ))}
          </>
        )}
      </div>
      <Button
        variant="contained"
        component={Link}
        to={`/dashboard/psychologist/profile/${psychologist._id}`}
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
);
