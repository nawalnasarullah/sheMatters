import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearUserInfo, setUserInfo } from "../features/authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),
    getMe: builder.query({
      query: () => "me",
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        console.log('starting');
        try{
          const {data} = await queryFulfilled;
          console.log('success', data);
          if(!data.success){
            dispatch(clearUserInfo());
          }else{
            dispatch(setUserInfo(data));
          }
        }catch(err){
          console.log('error', err);
          dispatch(clearUserInfo());
        }
      },
    }),
    logout: builder.query({
      query: () => "auth/logout",
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useGetMeQuery, useLazyLogoutQuery } = authApi;
