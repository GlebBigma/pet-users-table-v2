import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type UsersData = {
  users: User[];
  limit: number;
  skip: number;
  total: number;
};

export type User = {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  bloodGroup: string;
  height: number;
  weight: number;
  hair: {
    color: string;
    type: string;
  };
  userAgent: string;
  ip: string;
  macAddress: string;
};

export const usersApi = createApi({
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

export const { useGetUsersQuery } = usersApi;
