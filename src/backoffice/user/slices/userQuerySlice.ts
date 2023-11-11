import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../../config'
import { User } from '../../common/types/user.type'

export const userQuerySlice = createApi({
  reducerPath: 'userQuerySlice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/users`,
    // eslint-disable-next-line no-empty-pattern
    prepareHeaders: (headers, {}) => {
      headers.set('authorization', `Bearer ${localStorage.getItem('token')}`)
      return headers
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], User>({
      query: (item) => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    getUser: builder.query({
      query: (userId: string) => ({
        url: `/${userId}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    createUser: builder.mutation<User, User>({
      query: (item) => ({
        url: `/`,
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation<User, User>({
      query: (item) => ({
        url: `/`,
        method: 'DELETE',
        body: item,
      }),
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation<User, User>({
      query: (item) => ({
        url: `/${item.userId}`,
        method: 'PATCH',
        body: item,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'User', id: arg.userId },
      ],
    }),
  }),
})

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userQuerySlice
