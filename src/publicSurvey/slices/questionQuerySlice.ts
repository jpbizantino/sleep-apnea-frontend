import { Question } from '../../common/types'
import { baseQuerySlice } from './baseQuerySlice'

export const questionQuerySlice = baseQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<Question[], null>({
      query: () => ({
        url: `/questions/survey`,
        method: 'GET',
      }),
      providesTags: ['Questions'],
    }),
  }),
})
export const { useGetQuestionsQuery } = questionQuerySlice
