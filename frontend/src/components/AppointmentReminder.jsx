import React, { useEffect, useRef, useState } from "react";
import {
  useGetAppointmentByIdQuery,
  useDeleteAppointmentByIdMutation,
  useMarkAppointmentCompletedMutation,
} from "../redux/api/appointmentApi";
import {
  Typography,
  ThemeProvider,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import theme from "./Theme";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppointmentReminder({ userId }) {
  const { data, error, isLoading, refetch } = useGetAppointmentByIdQuery(userId);
  const [deleteAppointmentById] = useDeleteAppointmentByIdMutation();
  const [markAppointmentCompleted] = useMarkAppointmentCompletedMutation();

  const notifiedAppointments = useRef(new Set());

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState(null); // 'cancel' or 'complete'
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  useEffect(() => {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
}, []);
  useEffect(() => {
    if (!data?.appointment) return;

    const checkNotifications = () => {
      const now = new Date().getTime();

      data.appointment.forEach((appointment) => {
        if (
          (appointment.userId === userId ||
            appointment.psychologistData?._id === userId) &&
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
            notifiedAppointments.current.add(appointment._id);
          }
        }
      });
    };

    const interval = setInterval(checkNotifications, 60 * 1000);
    checkNotifications();
    return () => clearInterval(interval);
  }, [data?.appointment, userId]);

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

  const handleOpenDialog = (action, appointmentId) => {
    setDialogAction(action);
    setSelectedAppointmentId(appointmentId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogAction(null);
    setSelectedAppointmentId(null);
  };

  const handleConfirmAction = async () => {
    try {
      if (dialogAction === "cancel") {
        await deleteAppointmentById(selectedAppointmentId).unwrap();
        toast.success("Appointment cancelled successfully!", {
          progressClassName: "toast-progress-success"
        });
      } else if (dialogAction === "complete") {
        await markAppointmentCompleted(selectedAppointmentId).unwrap();
        toast.success("Appointment completed successfully!", {
          progressClassName: "toast-progress-success"
        });
      }
      refetch();
    } catch (error) {
      toast.error("An error occurred while updating the appointment.");
    } finally {
      handleCloseDialog();
    }
  };

  if (isLoading) return <p>Loading appointments...</p>;
  if (error) {
    const errorMessage =
      error?.data?.message || error?.message || "Something went wrong";
    return <p>Error: {errorMessage}</p>;
  }

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
                      onClick={() => handleOpenDialog("complete", appointment._id)}
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
                      onClick={() => handleOpenDialog("cancel", appointment._id)}
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
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ fontWeight: "bold", color: "primary.main" }}>
          {dialogAction === "cancel"
            ? "Cancel Appointment"
            : "Mark Appointment as Completed"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "1rem" }}>
            Are you sure you want to{" "}
            {dialogAction === "cancel" ? "cancel" : "complete"} this appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary" variant="contained">
            No
          </Button>
          <Button onClick={handleConfirmAction} color="primary" variant="contained">
            Yes
          </Button>
        </DialogActions>

      </Dialog>
    </ThemeProvider>
  );
}

export default AppointmentReminder;
