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
        addToCart: builder.mutation<{ msg: string }, { id: string }>({
            query: (id) => ({
                url: '/api/cart/',
                method: 'POST',
                body: id,
            }),
            invalidatesTags: ['Cart'],
        }),
        Increment: builder.mutation<{ msg: string }, { id: string }>({
            query: (id) => ({
                url: '/api/cart/increment',
                method: 'POST',
                body: id,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Cart', id: arg.id }],
        }),
        Decrement: builder.mutation<{ msg: string }, { id: string }>({
            query: (id) => ({
                url: '/api/cart/decrement',
                method: 'POST',
                body: id,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Cart', id: arg.id }],
        }),

        deleteCart: builder.mutation<{ msg: string }, { id: string }>({
            query: (id) => ({
                url: '/api/cart/deleteall',
                method: 'POST',
                body: id,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Cart', id: arg.id }],
        }),
        deleteItemInCart: builder.mutation<{ msg: string }, { id: string }>({
            query: (id) => ({
                url: '/api/cart/',
                method: 'POST',
                body: id,

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
} = CartApi;