import { Result } from '../entities/result.entity'
import { surveyQuerySlice } from './surveyQuerySlice'

export const resultQuerySlice = surveyQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    createSurvey: builder.mutation<null, Result>({
      query: (result) => ({
        url: `/result`,
        method: 'POST',
        body: result,
      }),
      invalidatesTags: ['Questions'],
    }),
  }),
})

export const { useCreateSurveyMutation } = resultQuerySlice
