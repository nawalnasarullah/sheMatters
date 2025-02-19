import React from "react";
import { useGetAllAppointmentsQuery } from "../redux/api/appointmentApi";

function AppointmentReminder({ userId }) {
  const { data, error, isLoading } = useGetAllAppointmentsQuery();
  console.log('data shit', data);
  

  if (isLoading) return <p>Loading appointments...</p>;
  if (error) return <p>Error fetching appointments.</p>;

  // Ensure appointments exist before filtering
  const upcomingAppointments = data?.appointments?.filter(
    (appointment) => appointment.userId === userId || appointment.psychologistId === userId
  ) || [];

  return (
    <div className="flex flex-wrap gap-4">
      {upcomingAppointments.length > 0 ? (
        upcomingAppointments.map((appointment) => (
          <div
            key={appointment._id}
            className="w-full md:w-1/2 lg:w-1/3 p-4 border rounded-lg shadow-md bg-white"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Appointment Reminder 📅
            </h3>
            <p className="text-sm text-gray-600">
              <strong>Date:</strong> {appointment.slotDate}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Time:</strong> {appointment.slotTime}
            </p>
            <p className="text-sm text-gray-600">
              <strong>With:</strong>{" "}
              {appointment.userId === userId
                ? appointment.psychologistData?.name
                : appointment.userData?.username}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Fee:</strong> ${appointment.amount}
            </p>
            <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md">
              View Details
            </button>
          </div>
        ))
      ) : (
        <p>No upcoming appointments.</p>
      )}
    </div>
  );
}

export default AppointmentReminder;
