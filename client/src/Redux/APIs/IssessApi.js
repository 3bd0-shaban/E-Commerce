
import { apiSlice } from './ApiSlice';
export const IssessApi = apiSlice.injectEndpoints({
    tagTypes: ['Issess'],
    endpoints: (builder) => ({
        getIssess: builder.query({
            query: () => '/api/Issess/get',
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Issess', id })), 'Issess']
                    : ['Issess'],
        }),
        createIssess: builder.mutation({
            query: (data) => ({
                url: '/api/issess/new',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Issess'],
        }),
        deleteIssess: builder.mutation({
            query: (id) => ({
                url: `/api/issess/delete/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Issess', id: arg.id }],
        }),
    }),
});

export const {
    useCreateIssessMutation,
    useGetIssessQuery,
    useGetIssessDetailsQuery,
    useDeleteIssessMutation,
} = IssessApi;
