import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPsychologistByIdQuery } from "../../redux/api/psychologistApi";
import { useBookAppointmentMutation } from "../../redux/api/appointmentApi";
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
import AvailableSlots from "../../components/AvailableSlots";
import { useSelector } from "react-redux";

export default function PsychologistProfile() {
  const { id } = useParams(); // Get the psychologist ID from the URL params
  const navigate = useNavigate();

  // Fetch psychologist details by ID
  const { data, isLoading, isError } = useGetPsychologistByIdQuery(id);
  const { user } = useSelector((state) => state.auth);

  const [slotIndex, setSlotIndex] = useState([]);
  const [slotTime, setSlotTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [bookAppointment, { isLoading: isBooking }] = useBookAppointmentMutation();

  useEffect(() => {
    if (isError) {
      alert("Failed to load psychologist profile");
      navigate("/");
    }
  }, [isError, navigate]);

  const handleBookAppointment = async () => {
    if (!slotTime || !selectedDate) {
      alert("Please select a slot before booking.");
      return;
    }

    try {
      await bookAppointment({
        psychologistId: id,
        userId: user?.user?._id,
        slotDate: selectedDate,
        slotTime,
      }).unwrap();
      alert("Appointment booked successfully!");
    } catch (error) {
      alert(error?.data?.message || "Failed to book appointment.");
    }
  };

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
              sx={{ fontSize: "1rem" }}
              variant="h5"
              color="textSecondary"
              gutterBottom
            >
              Username:
            </Typography>

            <Typography
              sx={{ fontSize: "1rem" }}
              variant="h5"
              color="primary.main"
              gutterBottom
            >
              {psychologist?.username}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              sx={{ fontSize: "1rem" }}
              variant="h5"
              color="textSecondary"
              gutterBottom
            >
              Email:
            </Typography>

            <Typography
              sx={{ fontSize: "1rem" }}
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
              sx={{ fontSize: "1rem" }}
              variant="h5"
              color="textSecondary"
              gutterBottom
            >
              Phone Number:
            </Typography>

            <Typography
              sx={{ fontSize: "1rem" }}
              variant="h5"
              color="primary.main"
              gutterBottom
            >
              {psychologist?.phoneNumber || "N/A"}
            </Typography>
          </Box>

          <div className="mt-3">
            <Typography
              variant="h5"
              color="primary.main"
              sx={{ marginBottom: "10px", fontSize: "1.2rem" }}
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

          <div className="mt-3">
            <Typography
              variant="h5"
              color="primary.main"
              sx={{ marginBottom: "10px", fontSize: "1.2rem" }}
            >
              Experience:
            </Typography>
            <Typography
              sx={{ fontSize: "1rem" }}
              variant="h5"
              color="textSecondary"
            >
              {psychologist?.experience}
            </Typography>
          </div>

          <div className="mt-3">
            <AvailableSlots   psychologistId={id}
              slotIndex={slotIndex}
              setSlotIndex={setSlotIndex}
              slotTime={slotTime}
              setSlotTime={setSlotTime}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}/>
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
          <Button
            variant="contained"
            onClick={handleBookAppointment}
            disabled={isBooking}
            sx={{
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.hover" },
              color: "white",
              py: 1,
              px: 4,
              textTransform: "uppercase",
              borderRadius: 1,
              mt: 3,
              ml: 1,
            }}
          >
              {isBooking ? "Booking..." : "Book Appointment"}
          </Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
