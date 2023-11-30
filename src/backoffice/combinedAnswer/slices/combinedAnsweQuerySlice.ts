import { CalculatedField } from '../../../common/types'
import { backofficeQuerySlice } from '../../common/slices/backofficeQuerySlice'

export const combinedAnswerQuerySlice = backofficeQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    getCalculatedFields: builder.query<CalculatedField[], null>({
      query: () => ({
        url: `/calculated-fields`,
        method: 'GET',
        //body: filter,
      }),
      providesTags: ['CalculatedFields'],
    }),
    getCalculatedField: builder.query<CalculatedField, string>({
      query: (id: string) => ({
        url: `/calculated-fields/${id}`,
        method: 'GET',
      }),

      providesTags: ['CalculatedFields'],
    }),
    deleteCalculatedField: builder.mutation<CalculatedField, CalculatedField>({
      query: (item) => ({
        url: `/calculated-fields/${item.calculatedFieldId}`,
        method: 'DELETE',
        body: item,
      }),

      invalidatesTags: (_result, _error, arg) => [
        { type: 'CalculatedFields', physicianId: arg.calculatedFieldId },
      ],
    }),
    createCalculatedField: builder.mutation<CalculatedField, CalculatedField>({
      query: (item) => ({
        url: `/calculated-fields`,
        method: 'POST',
        body: item,
      }),

      invalidatesTags: (_result, _error, arg) => [
        { type: 'CalculatedFields', physicianId: arg.calculatedFieldId },
      ],
    }),

    updateCalculatedField: builder.mutation<CalculatedField, CalculatedField>({
      query: (item) => ({
        url: `/calculated-fields/${item.calculatedFieldId}`,
        method: 'PATCH',
        body: item,
      }),

      invalidatesTags: (_result, _error, arg) => [
        { type: 'CalculatedFields', physicianId: arg.calculatedFieldId },
      ],
    }),
  }),
})
export const {
  useGetCalculatedFieldsQuery,
  useGetCalculatedFieldQuery,
  useCreateCalculatedFieldMutation,
  useUpdateCalculatedFieldMutation,
  useDeleteCalculatedFieldMutation,
} = combinedAnswerQuerySlice
