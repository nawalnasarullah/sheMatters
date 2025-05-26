import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builder) => ({
    bookAppointment: builder.mutation({
      query: ({ psychologistId, userId, slotDate, slotTime }) => ({
        url: "appointment/book",
        method: "POST",
        body: { psychologistId, userId, slotDate, slotTime },
      }),
    }),

    getAllAppointments: builder.query({
      query: () => "appointment/all",
    }),

    getAppointmentById: builder.query({
      query: (userId) => `appointment/${userId}/`,
    }),

    deleteAppointmentById: builder.mutation({
      query: (appointmentId) => ({
        url: `/appointment/cancel/${appointmentId}`,
        method: "DELETE",
      }),
    }),

    markAppointmentCompleted: builder.mutation({
      query: (appointmentId) => ({
        url: `/appointment/complete/${appointmentId}`,
        method: "PATCH",
      }),
    }),

    getUpcomingAppointmentsById: builder.query({
      query: (id) => `appointment/upcoming/${id}/`,
    }),

  }),
});

export const {
  useBookAppointmentMutation,
  useGetAllAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useDeleteAppointmentByIdMutation,
  useMarkAppointmentCompletedMutation,
  useGetUpcomingAppointmentsByIdQuery,
} = appointmentApi;
