import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {setPsychologistInfo, clearPsychologistInfo} from "../features/psychologistAuthSlice";

export const psychologistAuthApi = createApi({
  reducerPath: "psychologistAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    loginPsychologist: builder.mutation({
      query: (data) => ({
        url: "psychologist/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    registerPsychologist: builder.mutation({
      query: (data) => ({
        url: "psychologist/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "psychologist/auth/forgotPassword",
        method: "POST",
        body: { email },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: "psychologist/auth/resetPassword",
        method: "POST",
        body: { token, newPassword },
      }),
    }),
    getMe: builder.query({
      query: () => "psychologist/me",
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        console.log('starting');
        try{
          const {data} = await queryFulfilled;
          console.log('success', data);
          if(!data.success){
            dispatch(clearPsychologistInfo());
          }else{
            dispatch(setPsychologistInfo(data));
          }
        }catch(err){
          console.log('error', err);
          dispatch(clearPsychologistInfo());
        }
      },
    }),
    logout: builder.query({
      query: () => "psychologist/auth/logout",
    }),
  }),
});

export const { useLoginPsychologistMutation, useRegisterPsychologistMutation,  useForgotPasswordMutation,
  useResetPasswordMutation, useGetMeQuery, useLazyLogoutQuery } = psychologistAuthApi;
