import React, { useEffect } from "react";
import { useGetAppointmentByIdQuery } from "../redux/api/appointmentApi";
import { Typography, ThemeProvider, Card, Button } from "@mui/material";
import theme from "./Theme";

function AppointmentReminder({ userId }) {
  const { data, error, isLoading } = useGetAppointmentByIdQuery(userId);

  useEffect(() => {
    if (!data?.appointment) return;

    const checkNotifications = () => {
      const now = new Date().getTime();

      data.appointment.forEach((appointment) => {
        if (appointment.userId === userId || appointment.psychologistData?._id === userId) {
          const [hours, minutes] = appointment.slotTime.split(":");
          const appointmentTime = new Date(appointment.slotDate).setHours(hours, minutes, 0, 0);
          const timeDiff = appointmentTime - now;

          if (timeDiff > 0 && timeDiff <= 10 * 60 * 1000) {
            sendBrowserNotification(appointment);
          }
        }
      });
    };

    const interval = setInterval(checkNotifications, 60 * 1000);
    return () => clearInterval(interval);
  }, [data, userId]);

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

  const handleStatusUpdate = (appointmentId, status) => {
    console.log(`Appointment ${appointmentId} marked as ${status}`);
    // Add your API call or Redux action to update appointment status here
  };

  if (isLoading) return <p>Loading appointments...</p>;
  if (error) return <p>Error fetching appointments.</p>;

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h5" color="primary.main" sx={{ fontWeight: 600, marginBottom: "10px" }}>
        Appointment Reminders
      </Typography>

      <div className="w-full overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth pb-2">
        <div className="flex space-x-4">
          {data?.appointment?.map((appointment, index) => (
            <Card
              key={index}
              className="min-w-[320px] flex justify-between items-center mb-4 p-4 border rounded-lg shadow-md bg-white"
            >
              <div>
                <p className="text-gray-600 flex items-baseline">
                  <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "bold" }}>Date:</Typography>
                  <Typography sx={{ paddingLeft: "5px" }}>{appointment?.slotDate}</Typography>
                </p>
                <p className="text-gray-600 flex items-baseline">
                  <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "bold" }}>Time:</Typography>
                  <Typography sx={{ paddingLeft: "5px" }}>{appointment?.slotTime}</Typography>
                </p>
                <p className="text-gray-600 flex items-baseline">
                  <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "bold" }}>With:</Typography>
                  <Typography sx={{ paddingLeft: "5px" }}>
                    {appointment?.psychologistData?.firstName} {appointment?.psychologistData?.lastName}
                  </Typography>
                </p>

                <div className="flex space-x-2 mt-2">
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ backgroundColor: "primary.main", "&:hover": { backgroundColor: "primary.hover" } }}
                  >
                    Completed
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ backgroundColor: "secondary.dark", "&:hover": { backgroundColor: "secondary.dark" } }}
                  >
                    Cancelled
                  </Button>
                </div>
              </div>
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                <img src={appointment?.psychologistData?.avatar} alt="Psychologist Avatar" className="w-full h-full object-cover" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default AppointmentReminder;
