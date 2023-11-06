import { backofficeQuerySlice } from '../../common/slices/backofficeQuerySlice'
import { Survey, SurveyFilter } from '../../common/types/survey.type'

export const surveyQuerySlice = backofficeQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    getSurveys: builder.query<Survey[], SurveyFilter>({
      query: () => ({
        url: `/surveys`,
        method: 'GET',
        //body: filter,
      }),
      providesTags: ['Survey'],
    }),
    getSurvey: builder.query<Survey, string>({
      query: (id: string) => ({
        url: `/surveys/${id}`,
        method: 'GET',
      }),

      providesTags: ['Survey'],
    }),
    createSurvey: builder.mutation<Survey, Survey>({
      query: (item) => ({
        url: `/surveys`,
        method: 'POST',
        body: item,
      }),

      invalidatesTags: (_result, _error, arg) => [
        { type: 'Survey', physicianId: arg.surveyId },
      ],
    }),

    updateSurvey: builder.mutation<Survey, Survey>({
      query: (item) => ({
        url: `/surveys/${item.surveyId}`,
        method: 'PATCH',
        body: item,
      }),

      invalidatesTags: (_result, _error, arg) => [
        { type: 'Survey', physicianId: arg.surveyId },
      ],
    }),
  }),
})
export const {
  useGetSurveysQuery,
  useGetSurveyQuery,
  useCreateSurveyMutation,
  useUpdateSurveyMutation,
} = surveyQuerySlice
