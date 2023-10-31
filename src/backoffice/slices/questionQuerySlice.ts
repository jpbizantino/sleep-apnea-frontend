import { Question, QuestionFilter } from '../../common/types'
import { backofficeQuerySlice } from './backofficeQuerySlice'

export const questionQuerySlice = backofficeQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<Question[], QuestionFilter>({
      query: () => ({
        url: `/questions`,
        method: 'GET',
        //body: filter,
      }),
      providesTags: ['Backoffice'],
    }),
    getQuestion: builder.query<Question, string>({
      query: (id: string) => ({
        url: `/questions/${id}`,
        method: 'GET',
      }),

      providesTags: ['Backoffice'],
    }),
    createQuestion: builder.mutation<Question, Question>({
      query: (item) => ({
        url: `/questions`,
        method: 'POST',
        body: item,
      }),

      invalidatesTags: (_result, _error, arg) => [
        { type: 'Backoffice', physicianId: arg.questionId },
      ],
    }),

    updateQuestion: builder.mutation<Question, Question>({
      query: (item) => ({
        url: `/questions/${item.questionId}`,
        method: 'PATCH',
        body: item,
      }),

      invalidatesTags: (_result, _error, arg) => [
        { type: 'Backoffice', physicianId: arg.questionId },
      ],
    }),
  }),
})
export const {
  useGetQuestionsQuery,
  useGetQuestionQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} = questionQuerySlice
