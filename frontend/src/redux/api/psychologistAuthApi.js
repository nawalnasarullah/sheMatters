import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {setPsychologistInfo, clearPsychologistInfo} from "../features/psychologistAuthSlice";

export const psychologistAuthApi = createApi({
  reducerPath: "psychologistAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
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
        try{

          const {data} = await queryFulfilled;
          console.log('refresh token response : ', data);

          if(data.success)
          {
            dispatch(setPsychologistInfo(data));
            console.log("haha i am dispatching the thing", data.psychologist._id);
          }
          else
            dispatch(clearPsychologistInfo());
 
          
        }catch(err){
          console.log('error', err);
          dispatch(clearPsychologistInfo());
        }
      },
    }),
    logout: builder.query({
      query: () => "psychologist/auth/logout",
    }),
    UpdatePsychologist: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `psychologist/update-profile?id=${_id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    GetRecommendedPyschologists : builder.query({
      query: ({ _id }) => ({
        url: `psychologist/recommended?id=${_id}`,
        method: "GET"
      }),
    }),
  }),
});

export const { useLoginPsychologistMutation, useUpdatePsychologistMutation,  useRegisterPsychologistMutation,  useForgotPasswordMutation,
  useResetPasswordMutation, useGetMeQuery, useLazyLogoutQuery , useGetRecommendedPyschologistsQuery } = psychologistAuthApi;
