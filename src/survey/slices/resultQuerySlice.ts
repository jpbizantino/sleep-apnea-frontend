import { Input } from '../entities/input.entity'
import { Result } from '../entities/result.entity'
import { surveyQuerySlice } from './surveyQuerySlice'

export const resultQuerySlice = surveyQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    createSurvey: builder.mutation<Input, Input>({
      query: (result) => ({
        url: `/result`,
        method: 'POST',
        body: result,
      }),
      invalidatesTags: ['Questions'],
    }),

    runAlgorithm: builder.query<Result, string>({
      query: (inputId) => ({
        url: `/result/runAlgorithm/${inputId}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useCreateSurveyMutation, useRunAlgorithmQuery } =
  resultQuerySlice
