import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = process.env.REACT_APP_API_KEY;

export const OrderApi = createApi({
    reducerPath: 'OrderApi',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        getUserOrder: builder.query({
            query: () => ({
                url: '/api/order/get/user',
                credentials: 'include',
            }),
            providesTags: ['Order'],
        }),
        getAllOrder: builder.query({
            query: () => ({
                url: '/api/order/get/all',
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
                url: '/api/order/get/pending',
                credentials: 'include',
            }),
            providesTags: ['Order'],
        }),
        getShipppedOrder: builder.query({
            query: () => ({
                url: '/api/order/get/shipped',
                credentials: 'include',
            }),
            providesTags: ['Order'],
        }),
        getDeliveredOrder: builder.query({
            query: () => ({
                url: '/api/order/get/delivered',
                credentials: 'include',
            }),
            providesTags: ['Order'],
        }),
        getcancelledOrder: builder.query({
            query: () => ({
                url: '/api/order/get/cancelled',
                credentials: 'include',
            }),
            providesTags: ['Order'],
        }),
        CancelOrder: builder.query({
            query: () => ({
                url: '/api/order/cancel',
                credentials: 'include',
            }),
            providesTags: ['Order'],
        }),
        changeOrderStatus: builder.mutation({
            query: (id) => ({
                url: `/api/order/change/status/${id}`,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Order'],
        }),
        newOrder: builder.mutation({
            query: () => ({
                url: '/api/order/new',
                method: 'POST',
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
    useCancelOrderQuery,
    useNewOrderMutation,
} = OrderApi;