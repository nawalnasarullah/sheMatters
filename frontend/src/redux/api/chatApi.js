import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL, credentials: 'include' }),
  tagTypes: ['Messages', 'Users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/messages/users',
      providesTags: ['Users'],
    }),
    getMessages: builder.query({
      query: (userId) => `/messages/${userId}`,
      providesTags: (result, error, userId) => [{ type: 'Messages', id: userId }],
    }),
    sendMessage: builder.mutation({
      query: ({ userId, messageData }) => ({
        url: `/messages/send/${userId}`,
        method: 'POST',
        body: messageData,
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: 'Messages', id: userId }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetMessagesQuery,
  useSendMessageMutation
} = chatApi;
