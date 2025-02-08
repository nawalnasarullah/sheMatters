// import React, { useState } from "react";
// import {
//   useCheckSlotAvailabilityMutation,
//   useBookAppointmentMutation,
// } from "../redux/api/appointmentApi";
// import {
//   TextField,
//   Button,
//   CircularProgress,
//   Box,
//   Typography,
// } from "@mui/material";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ThemeProvider } from "@emotion/react";

// import theme from "../components/Theme";

// const BookingForm = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
//   const userId = user?.user?._id;
//   const psychologistId = location.state?.psychologistId;

//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [checkSlotAvailability, { isLoading, error }] =
//     useCheckSlotAvailabilityMutation();
//   const [bookAppointment, { isLoading: isBooking, error: bookingError }] =
//     useBookAppointmentMutation();
//   const [slotAvailable, setSlotAvailable] = useState(true);

//   const handleCheckSlot = async () => {
//     try {
//       await checkSlotAvailability({ psychologistId, date, time }).unwrap();
//       setSlotAvailable(true);
//     } catch {
//       setSlotAvailable(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!slotAvailable) return;
//     try {
//       await bookAppointment({ psychologistId, userId, date, time }).unwrap();
//       alert("Appointment booked!");
//     } catch (err) {
//       alert("Error booking appointment");
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         maxWidth={400}
//         mx="auto"
//         p={3}
//         boxShadow={3}
//         borderRadius={2}
//         bgcolor="white"
//       >
//         <Typography variant="h5" mb={2} textAlign="center">
//           Book an Appointment
//         </Typography>
//         <TextField
//           label="Select Date"
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           fullWidth
//           margin="normal"
//           InputLabelProps={{ shrink: true }}
//         />
//         <TextField
//           label="Select Time"
//           type="time"
//           value={time}
//           onChange={(e) => setTime(e.target.value)}
//           fullWidth
//           margin="normal"
//           InputLabelProps={{ shrink: true }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleCheckSlot}
//           disabled={isLoading}
//           fullWidth
//           sx={{ mt: 2 }}
//         >
//           {isLoading ? (
//             <CircularProgress size={24} />
//           ) : (
//             "Check Slot Availability"
//           )}
//         </Button>
//         {!slotAvailable && (
//           <Typography color="error" mt={1}>
//             This slot is already taken.
//           </Typography>
//         )}
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleSubmit}
//           disabled={isBooking || !slotAvailable}
//           fullWidth
//           sx={{ mt: 2 }}
//         >
//           {isBooking ? <CircularProgress size={24} /> : "Book Appointment"}
//         </Button>
//         {bookingError && (
//           <Typography color="error" mt={1}>
//             {bookingError.message}
//           </Typography>
//         )}
//       </Box>

//       <Button
//         variant="outlined"
//         onClick={() => navigate(-1)}
//         sx={{
//           bgcolor: "primary.main",
//           "&:hover": { bgcolor: "primary.hover" },
//           color: "white !important",
//           py: 1,
//           px: 4,
//           textTransform: "uppercase",
//           borderRadius: 1,
//           mt: 3,
//         }}
//       >
//         Back
//       </Button>
//     </ThemeProvider>
//   );
// };

// export default BookingForm;
