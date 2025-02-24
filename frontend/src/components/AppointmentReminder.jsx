import React from "react";
import { useGetAppointmentByIdQuery } from "../redux/api/appointmentApi";
import { Typography, ThemeProvider, Card } from "@mui/material";
import theme from "./Theme";

function AppointmentReminder({ userId }) {
  const { data, error, isLoading } = useGetAppointmentByIdQuery(userId);

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

      {/* Container for horizontal scrolling */}
      <div className="w-full overflow-x-scroll whitespace-nowrap scrollbar-hide">
        <div className="flex space-x-4">
          {data?.appointment?.map((appointment, index) => (
            <Card
              key={index}
              className="min-w-[300px] flex justify-between items-center mb-4 p-4 border rounded-lg shadow-md bg-white"
            >
              <div>
                <p className="text-gray-600 flex items-baseline">
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "1rem", fontWeight: "bold" }}
                  >
                    Date:
                  </Typography>
                  <Typography sx={{ paddingLeft: "5px" }}>
                    {appointment?.slotDate}
                  </Typography>
                </p>
                <p className="text-gray-600 flex items-baseline">
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "1rem", fontWeight: "bold" }}
                  >
                    Time:
                  </Typography>
                  <Typography sx={{ paddingLeft: "5px" }}>
                    {appointment?.slotTime}
                  </Typography>
                </p>
                <p className="text-gray-600 flex items-baseline">
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "1rem", fontWeight: "bold" }}
                  >
                    With:
                  </Typography>
                  <Typography sx={{ paddingLeft: "5px" }}>
                    {appointment?.psychologistData?.firstName}{" "}
                    {appointment?.psychologistData?.lastName}
                  </Typography>
                </p>
              </div>
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                <img
                  src={appointment?.psychologistData?.avatar}
                  alt="Psychologist Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default AppointmentReminder;
