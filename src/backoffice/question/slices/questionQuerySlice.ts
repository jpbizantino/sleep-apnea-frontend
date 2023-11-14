import { Question, QuestionFilter } from '../../../common/types'
import { backofficeQuerySlice } from '../../common/slices/backofficeQuerySlice'

export const questionQuerySlice = backofficeQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<Question[], QuestionFilter>({
      query: () => ({
        url: `/questions`,
        method: 'GET',
        //body: filter,
      }),
      providesTags: ['Question'],
    }),
    getQuestion: builder.query<Question, string>({
      query: (id: string) => ({
        url: `/questions/${id}`,
        method: 'GET',
      }),

      providesTags: ['Question'],
    }),
    createQuestion: builder.mutation<Question, Question>({
      query: (item) => ({
        url: `/questions`,
        method: 'POST',
        body: item,
      }),

      invalidatesTags: (_result, _error, arg) => [
        { type: 'Question', physicianId: arg.questionId },
      ],
    }),

    updateQuestion: builder.mutation<Question, Question>({
      query: (item) => ({
        url: `/questions/${item.questionId}`,
        method: 'PATCH',
        body: item,
      }),

      invalidatesTags: (_result, _error, arg) => [
        { type: 'Question', physicianId: arg.questionId },
      ],
    }),
    moveUpQuestion: builder.mutation<null, Question>({
      query: (item) => ({
        url: `/questions/moveUp/${item.questionId}`,
        method: 'PATCH',
        body: item,
      }),

      invalidatesTags: (_result, _error, arg) => [
        { type: 'Question', physicianId: arg.questionId },
      ],
    }),
    moveDownQuestion: builder.mutation<null, Question>({
      query: (item) => ({
        url: `/questions/moveDown/${item.questionId}`,
        method: 'PATCH',
        body: item,
      }),

      invalidatesTags: (_result, _error, arg) => [
        { type: 'Question', physicianId: arg.questionId },
      ],
    }),
  }),
})
export const {
  useGetQuestionsQuery,
  useGetQuestionQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useMoveUpQuestionMutation,
  useMoveDownQuestionMutation,
} = questionQuerySlice
