import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = process.env.REACT_APP_API_KEY;

export const WhitelistApi = createApi({
    reducerPath: 'WhitelistApi',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    tagTypes: ['Whitelist'],
    endpoints: (builder) => ({
        getWhitelist: builder.query({
            query: () => ({
                url: '/api/whitelist/get',
                keepUnusedDataFor: 5,
                credentials: 'include',
            }),
            providesTags: ['Whitelist'],
        }),
        addToWhitelist: builder.mutation({
            query: (id) => ({
                url: `/api/whitelist/new/${id}`,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Whitelist'],
        }),
        deleteWhitelist: builder.mutation({
            query: (data) => ({
                url: `/api/whitelist/deleteall`,
                method: 'DELETE',
                credentials: 'include',
                body: data
            }),
            invalidatesTags: ['Whitelist'],
        }),
        deleteProductInWhitelist: builder.mutation({
            query: (id) => ({
                url: `/api/whitelist/delete/${id}`,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Whitelist'],
        }),
    }),
});

export const {
    useAddToWhitelistMutation,
    useGetWhitelistQuery,
    useDeleteWhitelistMutation,
    useDeleteProductInWhitelistMutation
} = WhitelistApi;
