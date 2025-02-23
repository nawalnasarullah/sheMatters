import React from "react";
import { useGetAllAppointmentsQuery } from "../redux/api/appointmentApi";
import { Typography, ThemeProvider } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import theme from "./Theme";

function AppointmentReminder({ userId }) {
  const { data, error, isLoading } = useGetAllAppointmentsQuery();
  console.log("data", data);

  if (isLoading) return <p>Loading appointments...</p>;
  if (error) return <p>Error fetching appointments.</p>;

  const upcomingAppointments =
    data?.appointments?.filter(
      (appointment) =>
        appointment.userId === userId ||
        appointment.psychologistData._id === userId
    ) || [];

  return (
    <div className="mb-4">
      <Typography
        variant="h5"
        color="primary.main"
        sx={{ fontWeight: 600, marginBottom: "10px" }}
      >
        Appointment Reminders
      </Typography>

      <AppointmentReminderCard
        upcomingAppointments={upcomingAppointments}
        userId={userId}
      />
    </div>
  );
}

export default AppointmentReminder;

const AppointmentReminderCard = ({ upcomingAppointments, userId }) => {
  const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <ThemeProvider theme={theme}>
      <Slider {...sliderSettings}>
        {upcomingAppointments.length > 0 ? (
          upcomingAppointments.map((appointment) => (
            <div 
              key={appointment._id}
            >
             <div className="p-4 border rounded-lg shadow-md bg-white mr-4">
             <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-600 flex items-baseline">
                    <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                      Date:
                    </Typography>
                    <Typography sx={{ paddingLeft: "5px" }}>
                      {appointment.slotDate}
                    </Typography>
                  </p>
                  <p className="text-gray-600 flex items-baseline">
                    <Typography variant="h6" sx={{ fontSize: "1rem",  fontWeight: "bold" }}>
                      Time:
                    </Typography>
                    <Typography sx={{ paddingLeft: "5px" }}>
                      {appointment.slotTime}
                    </Typography>
                  </p>
                  <p className="text-gray-600 flex items-baseline">
                    <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                      With:
                    </Typography>
                    <Typography sx={{ paddingLeft: "5px" }}>
                      {appointment.userId === userId
                        ? `${appointment.psychologistData?.firstName} ${appointment.psychologistData?.lastName}`
                        : appointment.userData?.username}
                    </Typography>
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                  <img
                    src={
                      appointment.psychologistData?.avatar ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Psychologist Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
             </div>
            </div>
          ))
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </Slider>
    </ThemeProvider>
  );
};
