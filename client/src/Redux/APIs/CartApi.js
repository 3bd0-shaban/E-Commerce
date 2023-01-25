import { apiSlice } from '../ApiSlice';
export const CartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => ({
                url: '/api/cart/get',
                credentials: 'include',
                keepUnusedDataFor: 5,
            }),
            providesTags: ['Cart','Order'],
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
} = CartApi;