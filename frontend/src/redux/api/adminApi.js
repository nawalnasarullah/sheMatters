import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setAdminInfo, clearAdminInfo } from "../features/adminSlice"

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
  
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: "admin/login",
        method: "POST",
        body: data,
      }),
    }),
    registerAdmin: builder.mutation({
      query: (data) => ({
        url: "admin/register",
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "admin/forgotPassword",
        method: "POST",
        body: { email },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: "admin/resetPassword",
        method: "POST",
        body: { token, newPassword },
      }),
    }),
    getMe: builder.query({
      query: () => "admin/me",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("starting")
        try {
          const { data } = await queryFulfilled
          console.log("success", data)
          if (!data.success) {
            dispatch(clearAdminInfo())
 
          } else {
            dispatch(setAdminInfo(data))
            console.log("admin", data.user)
          
          } 
        } catch (err) {
          console.log("error", err)
          dispatch(clearAdminInfo())
        }
      },
    }),
    logout: builder.query({
      query: () => "admin/logout",
    }),
  }),
})

export const {
  useLoginAdminMutation,
  useRegisterAdminMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetMeQuery,
  useLazyLogoutQuery,
} = adminApi
