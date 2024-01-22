import { GroupedField } from '../../../common/types/groupFieldtype'
import { backofficeQuerySlice } from '../../common/slices/backofficeQuerySlice'

const urlBase = 'grouped-fields'

export const groupedScoreQueryQuerySlice = backofficeQuerySlice.injectEndpoints(
  {
    endpoints: (builder) => ({
      findAllCombined: builder.query<GroupedField[], null>({
        query: () => ({
          url: `/${urlBase}/findAllCombined`,
          method: 'GET',
          //body: filter,
        }),
        providesTags: ['GroupedFields'],
      }),
      getGroupedFields: builder.query<GroupedField[], null>({
        query: () => ({
          url: `/${urlBase}`,
          method: 'GET',
          //body: filter,
        }),
        providesTags: ['GroupedFields'],
      }),
      getGroupedField: builder.query<GroupedField, string>({
        query: (id: string) => ({
          url: `/${urlBase}/${id}`,
          method: 'GET',
        }),

        providesTags: ['GroupedFields'],
      }),
      deleteGroupedField: builder.mutation<GroupedField, GroupedField>({
        query: (item) => ({
          url: `/${urlBase}/${item.groupedFieldId}`,
          method: 'DELETE',
          body: item,
        }),

        invalidatesTags: (_result, _error, arg) => [
          { type: 'GroupedFields', physicianId: arg.groupedFieldId },
        ],
      }),
      createGroupedField: builder.mutation<GroupedField, GroupedField>({
        query: (item) => ({
          url: `/${urlBase}`,
          method: 'POST',
          body: item,
        }),

        invalidatesTags: (_result, _error, arg) => [
          { type: 'GroupedFields', physicianId: arg.groupedFieldId },
        ],
      }),

      updateGroupedField: builder.mutation<GroupedField, GroupedField>({
        query: (item) => ({
          url: `/${urlBase}/${item.groupedFieldId}`,
          method: 'PATCH',
          body: item,
        }),

        invalidatesTags: (_result, _error, arg) => [
          { type: 'GroupedFields', physicianId: arg.groupedFieldId },
        ],
      }),
    }),
  }
)
export const {
  useFindAllCombinedQuery,
  useGetGroupedFieldsQuery,
  useGetGroupedFieldQuery,
  useCreateGroupedFieldMutation,
  useUpdateGroupedFieldMutation,
  useDeleteGroupedFieldMutation,
} = groupedScoreQueryQuerySlice
