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
                url: '/api/cart/',
                method: 'POST',
                body: productId,
            }),
            invalidatesTags: ['Cart'],
        }),
        Increment: builder.mutation<{ message: string }, { product_Id: string }>({
            query: ({ product_Id }) => ({
                url: '/api/cart/increment',
                method: 'POST',
                body: product_Id,
            }),
            invalidatesTags: ['Cart'],
        }),
        Decrement: builder.mutation<{ message: string }, { product_Id: string }>({
            query: ({ product_Id }) => ({
                url: '/api/cart/decrement',
                method: 'POST',
                body: product_Id,
            }),
            invalidatesTags: ['Cart'],
        }),

        deleteCart: builder.mutation<{ message: string }, { product_Id: string }>({
            query: ({ product_Id }) => ({
                url: '/api/cart/deleteall',
                method: 'POST',
                body: product_Id,
            }),
            invalidatesTags: ['Cart'],
        }),
        deleteItemInCart: builder.mutation<{ message: string }, { product_Id: string }>({
            query: ({ product_Id }) => ({
                url: '/api/cart/',
                method: 'POST',
                body: product_Id,

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