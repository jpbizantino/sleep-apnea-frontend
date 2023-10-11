import { Question } from '../../common/types'
import { surveyQuerySlice } from './surveyQuerySlice'

export const questionQuerySlice = surveyQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<Question[], null>({
      query: () => ({
        url: `/question`,
        method: 'GET',
      }),
      providesTags: ['Questions'],
    }),
  }),
})
export const { useGetQuestionsQuery } = questionQuerySlice
