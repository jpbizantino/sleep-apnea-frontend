import { Question, QuestionFilter } from '../../common/types'
import { backofficeQuerySlice } from './backofficeQuerySlice'

export const questionQuerySlice = backofficeQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<Question[], QuestionFilter>({
      query: () => ({
        url: `/question`,
        method: 'GET',
        //body: filter,
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
    createQuestion: builder.mutation<Question, Question>({
      query: (item) => ({
        url: `/question`,
        method: 'POST',
        body: item,
      }),

      invalidatesTags: (_result, _error, arg) => [
        { type: 'Backoffice', physicianId: arg._id },
      ],
    }),

    updateQuestion: builder.mutation<Question, Question>({
      query: (item) => ({
        url: `/question/${item._id}`,
        method: 'PUT',
        body: item,
      }),

      invalidatesTags: (_result, _error, arg) => [
        { type: 'Backoffice', physicianId: arg._id },
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
