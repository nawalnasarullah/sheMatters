import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPsychologistByIdQuery } from "../../redux/api/psychologistApi";
import { useBookAppointmentMutation, useCreateCheckoutSessionMutation } from "../../redux/api/appointmentApi";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PsychologistProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetPsychologistByIdQuery(id);
  const { user } = useSelector((state) => state.auth);

  const [slotIndex, setSlotIndex] = useState([]);
  const [slotTime, setSlotTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [bookAppointment, { isLoading: isBooking }] = useBookAppointmentMutation();
  const [createCheckoutSession, { isLoading: isPaying }] = useCreateCheckoutSessionMutation();


  useEffect(() => {
    if (isError) {
      toast.error("Failed to load psychologist profile");
      navigate("/");
    }
  }, [isError, navigate]);

 const handleBookAppointment = async () => {
  if (!slotTime || !selectedDate) {
    toast.warning("Please select a slot before booking.");
    return;
  }

  try {
    const response = await createCheckoutSession({
      psychologistId: id,
      userId: user?.user?._id,
      slotDate: selectedDate,
      slotTime,
    }).unwrap();

    if (response?.url) {
      window.location.href = response.url; // Redirect to Stripe Checkout
    } else {
      toast.error("Unable to redirect to payment.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to initiate payment.");
  }
};


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
            <Typography sx={{ fontSize: "1rem" }} variant="h5" color="textSecondary">
              Username:
            </Typography>
            <Typography sx={{ fontSize: "1rem" }} variant="h5" color="primary.main">
              {psychologist?.username}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography sx={{ fontSize: "1rem" }} variant="h5" color="textSecondary">
              Email:
            </Typography>
            <Typography sx={{ fontSize: "1rem" }} variant="h5" color="primary.main">
              {psychologist?.email}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography sx={{ fontSize: "1rem" }} variant="h5" color="textSecondary">
              Phone Number:
            </Typography>
            <Typography sx={{ fontSize: "1rem" }} variant="h5" color="primary.main">
              {psychologist?.phoneNumber || "N/A"}
            </Typography>
          </Box>

          <div className="mt-3">
            <Typography variant="h5" color="primary.main" sx={{ mb: 1, fontSize: "1.2rem" }}>
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
            <Typography variant="h5" color="primary.main" sx={{ mb: 1, fontSize: "1.2rem" }}>
              Experience:
            </Typography>
            <Typography sx={{ fontSize: "1rem" }} variant="h5" color="textSecondary">
              {psychologist?.experience}
            </Typography>
          </div>

          <div className="mt-3">
            <AvailableSlots
              psychologistId={id}
              slotIndex={slotIndex}
              setSlotIndex={setSlotIndex}
              slotTime={slotTime}
              setSlotTime={setSlotTime}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
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
              }}
            >
              {isBooking ? "Booking..." : "Book Appointment"}
            </Button>
          </Box>
        </CardContent>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
      </Card>
    </ThemeProvider>
  );
}
