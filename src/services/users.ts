import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UsersData } from './types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<
      UsersData,
      { searchTerm?: string; limit?: number; page?: number }
    >({
      query: ({ searchTerm = '', limit = 10, page = 1 }) =>
        `users/search?q=${searchTerm}&limit=${limit}&skip=${
          (page - 1) * limit
        }`,
    }),
  }),
});

export const { useGetUsersQuery } = apiSlice;
