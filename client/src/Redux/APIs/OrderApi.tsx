'use client';
import { orderType } from '@lib/types/order';
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
        getAllOrder: builder.query<{ status: string; results: number, orders: orderType[] }, { page: 1 }>({
            query: ({ page }) => ({
                url: `/api/order/all?page=${page}`,
                method:'GET',
            }),
            providesTags: ['Order'],
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `/api/order/${id}`,
                method: 'GET',
            }),
            providesTags: ['Order'],
        }),
        getPendingOrder: builder.query({
            query: () => ({
                url: '/api/order/pending',
                method: 'GET',
            }),
            providesTags: ['Order'],
        }),
        getShipppedOrder: builder.query({
            query: () => ({
                url: '/api/order/shipped',
                method: 'GET',
            }),
            providesTags: ['Order'],
        }),
        getDeliveredOrder: builder.query({
            query: () => ({
                url: '/api/order/delivered',
                method: 'GET',
            }),
            providesTags: ['Order'],
        }),
        getcancelledOrder: builder.query({
            query: () => ({
                url: '/api/order/cancelled',
                method: 'GET',
            }),
            providesTags: ['Order'],
        }),
        CancelOrder: builder.mutation({
            query: (id) => ({
                url: `/api/order/cancel/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: ['Order'],
        }),
        changeOrderStatus: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/order/change/status/${id}`,
                method: 'PUT',
                bosy: data,
            }),
            invalidatesTags: ['Order'],
        }),
        newOrder: builder.mutation<{ message: string }, void>({
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