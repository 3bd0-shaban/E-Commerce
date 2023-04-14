'use client';
import { apiSlice } from '../ApiSlice';

export const OrderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserOrder: builder.query({
            query: () => ({
                url: '/api/order/user',
                credentials: 'include',
            }),
            providesTags: ['Order'],
        }),
        getAllOrder: builder.query({
            query: () => ({
                url: '/api/order/all',
                credentials: 'include',
            }),
            providesTags: ['Order'],
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `/api/order/${id}`,
                credentials: 'include',
            }),
            providesTags: ['Order'],
        }),
        getPendingOrder: builder.query({
            query: () => ({
                url: '/api/order/pending',
                credentials: 'include',
            }),
            providesTags: ['Order'],
        }),
        getShipppedOrder: builder.query({
            query: () => ({
                url: '/api/order/shipped',
                credentials: 'include',
            }),
            providesTags: ['Order'],
        }),
        getDeliveredOrder: builder.query({
            query: () => ({
                url: '/api/order/delivered',
                credentials: 'include',
            }),
            providesTags: ['Order'],
        }),
        getcancelledOrder: builder.query({
            query: () => ({
                url: '/api/order/cancelled',
                credentials: 'include',
            }),
            providesTags: ['Order'],
        }),
        CancelOrder: builder.mutation({
            query: (id) => ({
                url: `/api/order/cancel/${id}`,
                credentials: 'include',
                method: 'PUT'
            }),
            invalidatesTags: ['Order'],
        }),
        changeOrderStatus: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/order/change/status/${id}`,
                method: 'PUT',
                credentials: 'include',
                bosy: data,
            }),
            invalidatesTags: ['Order'],
        }),
        newOrder: builder.mutation<{ msg: string }, void>({
            query: () => ({
                url: '/api/order/',
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Order'],
        }),
        LoadPaypal: builder.mutation({
            query: () => ({
                url: '/api/keys/paypal',
                method: 'GET',
                credentials: 'include',
            }),
            invalidatesTags: ['Order'],
        }),
    }),
});

export const {
    useGetUserOrderQuery,
    useGetAllOrderQuery,
    useGetOrderDetailsQuery,
    useGetPendingOrderQuery,
    useGetShipppedOrderQuery,
    useGetDeliveredOrderQuery,
    useGetcancelledOrderQuery,
    useChangeOrderStatusMutation,
    useCancelOrderMutation,
    useNewOrderMutation,
    useLoadPaypalMutation,
} = OrderApi;