import { CombinedField } from '../../../common/types/combinedFields.type'
import { backofficeQuerySlice } from '../../common/slices/backofficeQuerySlice'

export const groupScoreQueryQuerySlice = backofficeQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    getCombinedFields: builder.query<CombinedField[], null>({
      query: () => ({
        url: `/combined-fields`,
        method: 'GET',
        //body: filter,
      }),
      providesTags: ['CombinedFields'],
    }),
    getCombinedField: builder.query<CombinedField, string>({
      query: (id: string) => ({
        url: `/combined-fields/${id}`,
        method: 'GET',
      }),

      providesTags: ['CombinedFields'],
    }),
    deleteCombinedField: builder.mutation<CombinedField, CombinedField>({
      query: (item) => ({
        url: `/combined-fields/${item.combinedFieldId}`,
        method: 'DELETE',
        body: item,
      }),

      invalidatesTags: (_result, _error, arg) => [
        { type: 'CombinedFields', physicianId: arg.combinedFieldId },
      ],
    }),
    createCombinedField: builder.mutation<CombinedField, CombinedField>({
      query: (item) => ({
        url: `/combined-fields`,
        method: 'POST',
        body: item,
      }),

      invalidatesTags: (_result, _error, arg) => [
        { type: 'CombinedFields', physicianId: arg.combinedFieldId },
      ],
    }),

    updateCombinedField: builder.mutation<CombinedField, CombinedField>({
      query: (item) => ({
        url: `/combined-fields/${item.combinedFieldId}`,
        method: 'PATCH',
        body: item,
      }),

      invalidatesTags: (_result, _error, arg) => [
        { type: 'CombinedFields', physicianId: arg.combinedFieldId },
      ],
    }),
  }),
})
export const {
  useGetCombinedFieldsQuery,
  useGetCombinedFieldQuery,
  useCreateCombinedFieldMutation,
  useUpdateCombinedFieldMutation,
  useDeleteCombinedFieldMutation,
} = groupScoreQueryQuerySlice
