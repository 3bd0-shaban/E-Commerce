import { apiSlice } from './ApiSlice';
export const WhitelistApi = apiSlice.injectEndpoints({

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
