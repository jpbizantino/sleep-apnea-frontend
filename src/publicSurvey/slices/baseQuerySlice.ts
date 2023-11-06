import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../config'

export const baseQuerySlice = createApi({
  reducerPath: 'baseQuerySlice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: (headers, {}) => {
      headers.set('authorization', `Bearer ${localStorage.getItem('token')}`)
      return headers
    },
  }),

  tagTypes: ['Questions', 'Survey'],

  endpoints: () => ({}),
})
