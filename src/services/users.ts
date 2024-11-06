import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
  image: string;
};

export type Data = {
  users: User[];
  limit: number;
  skip: number;
  total: number;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<Data, void>({
      query: () => 'users',
    }),
  }),
});

export const { useGetUsersQuery } = apiSlice;
