
import { apiSlice } from '../ApiSlice';

export const OrderApi = apiSlice.injectEndpoints({
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
    useCancelOrderMutation,
    useNewOrderMutation,
} = OrderApi;