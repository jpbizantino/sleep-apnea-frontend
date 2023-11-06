import { Survey, Result } from '../types'
import { baseQuerySlice } from './baseQuerySlice'

const base = 'surveys'

export const surveyQuerySlice = baseQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    createSurvey: builder.mutation<Survey, Survey>({
      query: (result) => ({
        url: `/${base}`,
        method: 'POST',
        body: result,
      }),
      invalidatesTags: ['Survey'],
    }),

    runAlgorithm: builder.query<Result, string>({
      query: (inputId) => ({
        url: `/${base}/runAlgorithm/${inputId}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useCreateSurveyMutation, useRunAlgorithmQuery } =
  surveyQuerySlice
