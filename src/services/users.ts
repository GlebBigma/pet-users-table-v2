import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UsersData } from './types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<UsersData, { searchTerm?: string }>({
      query: ({ searchTerm }) =>
        `users${searchTerm ? `/search?q=${searchTerm}` : ''}`,
    }),
  }),
});

export const { useGetUsersQuery } = apiSlice;
