import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = process.env.REACT_APP_API_KEY;

export const Issess_Query = createApi({
    reducerPath: 'IssessApi',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
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
} = Issess_Query;
