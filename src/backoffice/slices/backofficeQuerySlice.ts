import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../config'

export const backofficeQuerySlice = createApi({
  reducerPath: 'backofficeQuerySlice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    // prepareHeaders: (headers, {}) => {
    //   headers.set('authorization', `Bearer ${localStorage.getItem('token')}`)
    //   return headers
    // },
  }),
  tagTypes: ['Backoffice'],

  endpoints: () => ({}),
})
