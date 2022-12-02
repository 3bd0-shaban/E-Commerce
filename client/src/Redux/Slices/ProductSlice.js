import { createSlice } from "@reduxjs/toolkit"
const ProductsSlice = createSlice({
    name: "products",
    initialState: {
        loading: false,
        error: '',
        products: [],
        productDetails:[],
    },
    reducers: {
        Fetch_Products_Request(state) {
            state.products = [];
            state.productDetails = '';
            state.loading = true;
            state.error = '';
        },
        Fetch_Products_Success(state, action) {
            state.products = action.payload;
            state.productDetails = '';
            state.loading = false;
            state.error = ''
        },
        Fetch_Products_Fails(state, action) {
            state.loading = false;
            state.products = [];
            state.error = action.payload;
        },
        Fetch_ProductDetails_Request(state) {
            state.loading = true;
            state.error = '';
            state.productDetails = [];
        },
        Fetch_FetchDetails_Success(state, action) {
            state.productDetails = action.payload;
            state.loading = false;
            state.error = ''
        },
        Fetch_FetchDetails_Fails(state, action) {
            state.loading = false;
            state.products = [];
            state.error = action.payload;
        },
    },

})

export const ProductsAction = ProductsSlice.actions;
export default ProductsSlice.reducer
