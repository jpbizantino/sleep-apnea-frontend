import { Question } from '../../common/types'
import { backofficeQuerySlice } from './backofficeQuerySlice'

export const questionQuerySlice = backofficeQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<Question[], null>({
      query: () => ({
        url: `/question`,
        method: 'GET',
      }),
      providesTags: ['Backoffice'],
    }),
    getQuestion: builder.query<Question, string>({
      query: (id: string) => ({
        url: `/question/${id}`,
        method: 'GET',
      }),

      providesTags: ['Backoffice'],
    }),
  }),
})
export const { useGetQuestionsQuery, useGetQuestionQuery } = questionQuerySlice
