import { createSlice } from "@reduxjs/toolkit";
const CartSlice = createSlice({
    name: 'Cart',
    initialState: {
        cart: [],
        success: null,
        error: null,
        loading: false
    },
    reducers: {
        Addtocart_Request(state) {
            state.cart = [];
            state.loading = true;
            state.success = null;
            state.error = false
        },
        Addtocart_Success(state, action) {
            state.cart = action.payload;
            state.loading = false;
            state.success = action.payload.msg;
            state.error = false
        },
        Addtocart_Fails(state, action) {
            state.cart = [];
            state.loading = false;
            state.success = false;
            state.error = action.payload.msg
        },
        FetchCart_Request(state) {
            state.cart = [];
            state.loading = true;
            state.success = null;
            state.error = false
        },
        FetchCart_Success(state, action) {
            state.cart = action.payload;
            state.loading = false;
            state.error = false
        },
        FetchCart_Fails(state, action) {
            state.cart = [];
            state.loading = false;
            state.success = false;
            state.error = action.payload
        },
        DeleteCart_Request(state) {
            state.loading = true;
            state.success = null;
            state.error = false
        },
        DeleteCart_Success(state, action) {
            state.loading = false;
            state.success = action.payload.msg;
            state.error = false
        },
        DeleteCart_Fails(state, action) {
            state.loading = false;
            state.success = false;
            state.error = action.payload.msg
        },
        Increment_Item_Request(state) {
            state.loading = true;
            state.success = null;
            state.error = false
        },
        Increment_Item_Success(state, action) {
            state.cart = action.payload;
            state.loading = false;
            state.success = action.payload.msg;
            state.error = false
        },
        Increment_Item_Fails(state, action) {
            state.loading = false;
            state.success = false;
            state.error = action.payload.msg
        },
        Decrement_Item_Request(state) {
            state.loading = true;
            state.success = null;
            state.error = false
        },
        Decrement_Item_Success(state, action) {
            state.cart = action.payload;
            state.loading = false;
            state.success = action.payload.msg;
            state.error = false
        },
        Decrement_Item_Fails(state, action) {
            state.loading = false;
            state.success = false;
            state.error = action.payload.msg
        },
    }
})
export const CartActions = CartSlice.actions
export default CartSlice.reducer