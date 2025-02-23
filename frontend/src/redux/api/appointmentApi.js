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
      query: (id) => `appointment/${id}`,
    }),
  }),
});

export const {
  useBookAppointmentMutation,
  useGetAllAppointmentsQuery,
  useGetAppointmentByIdQuery,
} = appointmentApi;
