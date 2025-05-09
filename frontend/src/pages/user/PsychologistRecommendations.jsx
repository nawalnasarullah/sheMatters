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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Pill from "./Pill";

export default function PsychologistRecommendations() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useGetRecommendedPyschologistsQuery({
    _id: user?.user?._id || "",
  });

  console.log("ff", data);

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

  const settingsRec = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

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
        <Slider {...settingsRec}>
          {data.psychologists.map((psychologist) => (
            <div key={psychologist._id}>
              <PsychologistCard psychologist={psychologist} />
            </div>
          ))}
        </Slider>
      ) : (
        <Typography variant="h5" color="textSecondary">
          No recommendations available.
        </Typography>
      )}
    </>
  );
}

const PsychologistCard = ({ psychologist }) => (
  <Card className="border rounded-lg text-start" sx={{ marginRight: "15px" }}>
    <CardContent>
      <Typography variant="h5" color="textPrimary" sx={{ fontSize: "20px" }}>
        {psychologist.firstName} {psychologist.lastName}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Email: {psychologist.email}
      </Typography>
      <div className="flex gap-3 items-center mt-5 font-secondaryFont font-semibold">
        Specialization:{" "}
        {psychologist.labels?.map((label, index) => (
          <Pill value={label} key={index} />
        ))}
      </div>
      <div className="flex gap-3 items-center mt-5 font-secondaryFont font-semibold">
        {!psychologist.commonLabels || psychologist.commonLabels.length === 0 ? (
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
      <Typography
        variant="h6"
        color="textPrimary"
        sx={{ fontSize: "16px", fontWeight: 600, marginTop: "20px" }}
      >
        Fee per Session:{" "}
        <Box
          sx={{
            backgroundColor: "secondary.main",
            fontWeight: 700,
            fontSize: "14px",
            padding: "4px 10px",
            borderRadius: "20px",
            marginLeft: "8px",
            display: "inline-block",
          }}
        >
          Rs. {psychologist.fee}
        </Box>
      </Typography>
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

