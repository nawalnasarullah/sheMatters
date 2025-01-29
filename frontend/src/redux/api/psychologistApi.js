import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const psychologistApi = createApi({
  reducerPath: "psychologistApi",
  baseQuery: fetchBaseQuery({
     baseUrl: "http://localhost:8000/" 
    }),
  tagTypes: ["Psychologist"],
  endpoints: (builder) => ({

    // createPsychologist: builder.mutation({
    //   query: (psychologist) => ({
    //     url: "psychologist",
    //     method: "POST",
    //     body: psychologist,
    //   }),
    //   invalidatesTags: ["Psychologist"],
    // }),

   
    getAllPsychologists: builder.query({
      query: () => "psychologist/all",
      providesTags: ["Psychologist"],
    }),

    getRecommendedPsychologists: builder.query({
      query: ({ _id }) => ({
        url: `psychologist/recommended?id=${_id}`,
        method: "GET", 
      }),
      providesTags: ["Psychologist"], // Correct placement
    }),

   
    getPsychologistById: builder.query({
      query: (id) => `/psychologist/${id}`,
      providesTags: (result, error, id) => [{ type: "Psychologist", id }],
    }),


    updatePsychologist: builder.mutation({
      query: ({ id, data }) => ({
        url: `/psychologist?id=${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Psychologist", id },
      ],
    }),


    deletePsychologist: builder.mutation({
      query: (id) => ({
        url: `/psychologist?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Psychologist", id }],
    }),
  }),
});

export const {
  useCreatePsychologistMutation,
  useGetAllPsychologistsQuery,
  useGetRecommendedPsychologistsQuery,
  useGetPsychologistByIdQuery,
  useUpdatePsychologistMutation,
  useDeletePsychologistMutation,
} = psychologistApi;
