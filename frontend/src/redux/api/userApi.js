import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
     baseUrl: "http://localhost:8000/" 
    }),
  tagTypes: ["User"],
  endpoints: (builder) => ({

    createUser: builder.mutation({
      query: (user) => ({
        url: "user",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

   
    getAllUsers: builder.query({
      query: () => "user/all",
      providesTags: ["User"],
    }),


   
    getUserById: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),


    deleteUser: builder.mutation({
      query: (id) => ({
        url: "/user/delete",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),


  }),
});

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
} = userApi;
