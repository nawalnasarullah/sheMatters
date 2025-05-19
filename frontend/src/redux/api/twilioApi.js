// rtk/twilioApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const twilioApi = createApi({
  reducerPath: 'twilioApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    makeCall: builder.mutation({
      query: (to) => ({
        url: '/api/twilio/make-call',
        method: 'POST',
        body: { to },
      }),
    }),
  }),
});

export const { useMakeCallMutation } = twilioApi;
