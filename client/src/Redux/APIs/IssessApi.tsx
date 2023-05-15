
'use client';
import { apiSlice } from '../ApiSlice';
export const IssessApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getIssess: builder.query({
            query: () => '/api/Issess/',
        }),
        createIssess: builder.mutation({
            query: (data) => ({
                url: '/api/issess/',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Issess'],
        }),
        deleteIssess: builder.mutation({
            query: (id) => ({
                url: `/api/issess/${id}`,
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
    useDeleteIssessMutation,
} = IssessApi;
