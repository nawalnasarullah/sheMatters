import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const journalApi = createApi({
  reducerPath: "journalApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builder) => ({
    getJournals: builder.query({
      query: () => "/journal/all",
    }),

    getJournalById: builder.query({
      query: (id) => `/journal/${id}`,
    }),
    createJournal: builder.mutation({
      query: (journal) => ({
        url: "/journal/new",
        method: "POST",
        body: journal,
      }),
    }),
    updateJournal: builder.mutation({
      query: ({ id, ...journal }) => ({
        url: `/journal/update/${id}`,
        method: "PUT",
        body: journal,
      }),
    }),
    deleteJournal: builder.mutation({
      query: (id) => ({
        url: `/journals/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetJournalsQuery,
  useCreateJournalMutation,
  useUpdateJournalMutation,
  useDeleteJournalMutation,
  useGetJournalByIdQuery,
} = journalApi;
