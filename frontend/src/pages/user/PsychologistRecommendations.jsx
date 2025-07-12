import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetRecommendedPyschologistsQuery } from "../../redux/api/psychologistAuthApi";
import {
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import Pill from "./Pill";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { authApi } from "../../redux/api/authApi";

export default function PsychologistRecommendations() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useGetRecommendedPyschologistsQuery({
    _id: user?.user?._id || "",
  });

  console.log("Psychologist Recommendations Data:", data?.psychologists);

  //  const allApproved = data?.psychologists?.every(
  //   (psychologist) => psychologist.psychologistStatus === "approved"
  // );

  const approvedPsychologists = data?.psychologists?.filter(
    (psychologist) => psychologist.psychologistStatus === "approved"
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  if (!isAuthenticated) return null;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
            <CircularProgress
              style={{ color: "var(--web-primary)" }}
              size={48}
              thickness={4}
            />
          </div>
    );
  }

  if (isError || !data?.psychologists?.length || approvedPsychologists?.length === 0) {
    return (
      <>
        <Typography
          variant="h5"
          color="primary.main"
          sx={{ fontWeight: 600, mb: 2 }}
        >
          Psychologist Recommendations
        </Typography>
        <p className="text-center text-gray-500 font-secondaryFont">
          No recommendations available.
        </p>
      </>
    );
  }

  return (
    <>
      <Typography
        variant="h5"
        color="primary.main"
        sx={{ fontWeight: 600, mb: 2 }}
      >
        Psychologist Recommendations
      </Typography>

      {approvedPsychologists?.length > 0 && (
        <Slider {...settings}>
          {approvedPsychologists.map((psychologist) => (
            <div key={psychologist._id}>
              <PsychologistCard psychologist={psychologist} />
            </div>
          ))}
        </Slider>
      )}
    </>
  );
}

const PsychologistCard = ({ psychologist }) => (
  <Card
    sx={{
      width: 300,
      m: 1,
      boxShadow: 3,
    }}
  >
    <CardContent>
      <Typography variant="h6">
        {psychologist.firstName} {psychologist.lastName}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Email: {psychologist.email}
      </Typography>

      <Box mt={2}>
        <Typography variant="subtitle2" fontWeight="bold">
          Specialization:
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
          {psychologist.labels?.map((label, index) => (
            <Pill key={index} value={label} />
          ))}
        </Box>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle2" fontWeight="bold">
          Common Labels:
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
          {psychologist.commonLabels?.length > 0 ? (
            psychologist.commonLabels.map((label, index) => (
              <Pill key={index} value={label} />
            ))
          ) : (
            <Typography>No common labels</Typography>
          )}
        </Box>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle2" fontWeight="bold">
          Fee per Session:{" "}
          <Box
            component="span"
            sx={{
              backgroundColor: "#f8dada",
              px: 2,
              py: 0.5,
              borderRadius: "20px",
              fontWeight: 600,
              ml: 1,
            }}
          >
            Rs. {psychologist.fee}
          </Box>
        </Typography>
      </Box>

      <Button
        variant="contained"
        component={Link}
        to={`/dashboard/psychologist/profile/${psychologist._id}`}
        sx={{
          bgcolor: "primary.main",
          mt: 2,
          width: "100%",
          textTransform: "uppercase",
        }}
      >
        View Profile
      </Button>
    </CardContent>
  </Card>
);
