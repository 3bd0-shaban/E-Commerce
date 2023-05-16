'use client';
import { cartType } from '@lib/types/cart';
import { apiSlice } from '../ApiSlice';
export const CartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query<cartType, void>({
            query: () => ({
                url: '/api/cart/',
                method: 'GET',
            }),
            providesTags: ['Cart', 'Order'],
        }),
        addToCart: builder.mutation<{ message: string }, { productId: string }>({
            query: ({ productId }) => ({
                url: `/api/cart/${productId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Cart'],
        }),
        Increment: builder.mutation<{ message: string }, { productId: string }>({
            query: ({ productId }) => ({
                url: `/api/cart/increment/${productId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Cart'],
        }),
        Decrement: builder.mutation<{ message: string }, { productId: string }>({
            query: ({ productId }) => ({
                url: `/api/cart/decrement/${productId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Cart'],
        }),

        deleteCart: builder.mutation<{ message: string }, { productId: string }>({
            query: ({ productId }) => ({
                url: '/api/cart/deleteall',
                method: 'POST',
            }),
            invalidatesTags: ['Cart'],
        }),
        deleteItemInCart: builder.mutation<{ message: string }, { productId: string }>({
            query: ({ productId }) => ({
                url: `/api/cart/delete-single/${productId}`,
                method: 'POST',

            }),
            invalidatesTags: ['Cart'],
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
} = CartApi;