import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../config'
import { Patient } from '../types'

export const patientQuerySlice = createApi({
  reducerPath: 'patientQuerySlice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/patient`,
    // prepareHeaders: (headers, {}) => {
    //   headers.set('authorization', `Bearer ${localStorage.getItem('token')}`)
    //   return headers
    // },
  }),
  tagTypes: ['Patients'],

  endpoints: (builder) => ({
    createPatient: builder.mutation<Patient, Patient>({
      query: (item) => ({
        url: `/`,
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['Patients'],
    }),
  }),
})

export const { useCreatePatientMutation } = patientQuerySlice
