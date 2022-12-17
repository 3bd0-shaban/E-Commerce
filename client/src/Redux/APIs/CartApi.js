import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = process.env.REACT_APP_API_KEY;

export const Cart_Query = createApi({
    reducerPath: 'CartApi',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => ({
                url: '/api/cart/get',
                credentials: 'include',
            }),
            providesTags: ['Cart'],
        }),
        addToCart: builder.mutation({
            query: (product_Id) => ({
                url: '/api/cart/new',
                method: 'POST',
                credentials: 'include',
                body: product_Id,
            }),
            invalidatesTags: ['Cart'],
        }),
        Increment: builder.mutation({
            query: (product_Id) => ({
                url: '/api/cart/increment',
                method: 'POST',
                credentials: 'include',
                body: product_Id,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Cart', id: arg.id }],
        }),
        Decrement: builder.mutation({
            query: (product_Id) => ({
                url: '/api/cart/decrement',
                method: 'POST',
                credentials: 'include',
                body: product_Id,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Cart', id: arg.id }],
        }),

        deleteCart: builder.mutation({
            query: (product_Id) => ({
                url: '/api/cart/deleteall',
                method: 'POST',
                credentials: 'include',
                body: product_Id,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Cart', id: arg.id }],
        }),
        deleteItemInCart: builder.mutation({
            query: (product_Id) => ({
                url: '/api/cart/delete',
                method: 'POST',
                credentials: 'include',
                body: product_Id,

            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Cart', id: arg.id }],
        }),
    }),
});

export const {
    useAddToCartMutation,
    useGetCartQuery,
    useIncrementMutation,
    useDecrementMutation,
    useDeleteCartMutation,
    useDeleteItemInCartMutation,
} = Cart_Query;