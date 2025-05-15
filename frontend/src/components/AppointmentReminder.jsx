import React, { useEffect, useRef } from "react";
import {
  useGetAppointmentByIdQuery,
  useDeleteAppointmentByIdMutation,
  useMarkAppointmentCompletedMutation,
} from "../redux/api/appointmentApi";
import { Typography, ThemeProvider, Card, Button } from "@mui/material";
import theme from "./Theme";

function AppointmentReminder({ userId }) {
  const { data, error, isLoading, refetch } = useGetAppointmentByIdQuery(userId);
  const [deleteAppointmentById] = useDeleteAppointmentByIdMutation();
  const [markAppointmentCompleted] = useMarkAppointmentCompletedMutation();

  const notifiedAppointments = useRef(new Set()); // Track notified appointments

  useEffect(() => {
    if (!data?.appointment) return;

    const checkNotifications = () => {
      const now = new Date().getTime();

      data.appointment.forEach((appointment) => {
        if (
          (appointment.userId === userId || appointment.psychologistData?._id === userId) &&
          !notifiedAppointments.current.has(appointment._id)
        ) {
          const [hours, minutes] = appointment.slotTime.split(":");
          const appointmentTime = new Date(appointment.slotDate).setHours(
            hours,
            minutes,
            0,
            0
          );
          const timeDiff = appointmentTime - now;

          if (timeDiff > 0 && timeDiff <= 10 * 60 * 1000) {
            sendBrowserNotification(appointment);
            notifiedAppointments.current.add(appointment._id); // Avoid re-notifying
          }
        }
      });
    };

    const interval = setInterval(checkNotifications, 60 * 1000);
    checkNotifications(); // Run once immediately
    return () => clearInterval(interval);
  }, [data?.appointment, userId]); // Depend only on what's needed

  const sendBrowserNotification = (appointment) => {
    if (Notification.permission === "granted") {
      new Notification("Upcoming Appointment!", {
        body: `Your appointment with ${
          appointment.psychologistData?.firstName || "your psychologist"
        } is in 10 minutes!`,
      });
    } else if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          sendBrowserNotification(appointment);
        }
      });
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      await deleteAppointmentById(appointmentId).unwrap();
      alert("Appointment cancelled successfully!");
      refetch();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("An error occurred while cancelling the appointment.");
    }
  };

  const handleCompleteAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to complete this appointment?")) return;
    try {
      await markAppointmentCompleted(appointmentId).unwrap();
      alert("Appointment completed successfully!");
      refetch();
    } catch (error) {
      console.error("Error completing appointment:", error);
      alert("An error occurred while completing the appointment.");
    }
  };

  if (isLoading) return <p>Loading appointments...</p>;
  if (error) return <p>Error fetching appointments.</p>;

  return (
    <ThemeProvider theme={theme}>
      <Typography
        variant="h5"
        color="primary.main"
        sx={{ fontWeight: 600, marginBottom: "10px" }}
      >
        Appointment Reminders
      </Typography>

      <div className="w-full overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth pb-2">
        {data?.appointment?.length > 0 ? (
          <div className="flex space-x-4">
            {data.appointment.map((appointment) => (
              <Card
                key={appointment._id}
                className="min-w-[320px] flex justify-between items-center mb-4 p-4 border rounded-lg shadow-md bg-white"
              >
                <div>
                  <p className="text-gray-600 flex items-baseline">
                    <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                      Date:
                    </Typography>
                    <Typography sx={{ paddingLeft: "5px" }}>{appointment.slotDate}</Typography>
                  </p>
                  <p className="text-gray-600 flex items-baseline">
                    <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                      Time:
                    </Typography>
                    <Typography sx={{ paddingLeft: "5px" }}>{appointment.slotTime}</Typography>
                  </p>
                  <p className="text-gray-600 flex items-baseline">
                    <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                      With:
                    </Typography>
                    <Typography sx={{ paddingLeft: "5px" }}>
                      {appointment.psychologistData?.firstName}{" "}
                      {appointment.psychologistData?.lastName}
                    </Typography>
                  </p>

                  <div className="flex space-x-2 mt-2">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleCompleteAppointment(appointment._id)}
                      sx={{
                        backgroundColor: "primary.main",
                        "&:hover": { backgroundColor: "primary.hover" },
                      }}
                    >
                      Completed
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "secondary.dark",
                        "&:hover": { backgroundColor: "secondary.dark" },
                      }}
                      onClick={() => handleCancelAppointment(appointment._id)}
                    >
                      Cancelled
                    </Button>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                  <img
                    src={appointment.psychologistData?.avatar}
                    alt="Psychologist Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 font-secondaryFont">
            No appointments available.
          </p>
        )}
      </div>
    </ThemeProvider>
  );
}

export default AppointmentReminder;
