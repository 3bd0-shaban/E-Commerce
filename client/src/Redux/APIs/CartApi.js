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



// export const Add_to_cart = (product_Id) => async (dispatch) => {
//     try {
//         dispatch(CartActions.Addtocart_Request());
//         const res = await axios.post(`${url}/api/cart/new`, { product_Id });
//         dispatch(CartActions.Addtocart_Success(res.data));
//     } catch (error) {
//         dispatch(CartActions.Addtocart_Fails(getError(error)));
//     }
// };

// export const Increment = (product_Id) => async (dispatch) => {
//     try {
//         dispatch(CartActions.Increment_Item_Request());
//         const res = await axios.post(`${url}/api/cart/increment`, { product_Id });
//         dispatch(CartActions.Increment_Item_Success(res.data));
//     } catch (error) {
//         dispatch(CartActions.Increment_Item_Fails(getError(error)));
//     }
// };
// export const Dectrement = (product_Id) => async (dispatch) => {
//     try {
//         dispatch(CartActions.Decrement_Item_Request());
//         const res = await axios.post(`${url}/api/cart/decrement`, { product_Id });
//         dispatch(CartActions.Decrement_Item_Success(res.data));
//     } catch (error) {
//         dispatch(CartActions.Decrement_Item_Fails(getError(error)));
//     }
// };
// export const Delete_Items_In_Cart = (product_Id) => async (dispatch) => {
//     try {
//         dispatch(CartActions.DeleteCart_Request());
//         const res = await axios.post('/api/cart/deleteall', { product_Id });
//         dispatch(CartActions.DeleteCart_Success(res.data));
//     } catch (error) {
//         dispatch(CartActions.DeleteCart_Fails(getError(error)));
//     }
// };
// export const Delete_Specific_Item_In_Cart = (product_Id) => async (dispatch) => {
//     try {
//         dispatch(CartActions.DeleteCart_Request());
//         const res = await axios.post(`${url}/api/cart/delete`, { product_Id });
//         dispatch(CartActions.DeleteCart_Success(res.data));
//     } catch (error) {
//         dispatch(CartActions.DeleteCart_Fails(getError(error)));
//     }
// };

