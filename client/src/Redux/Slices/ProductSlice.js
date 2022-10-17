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
        Fetch_Data(state) {
            state.products = [];
            state.productDetails = '';
            state.loading = true;
            state.error = '';
        },
        Success_Fetch(state, action) {
            state.products = action.payload;
            state.productDetails = '';
            state.loading = false;
            state.error = ''
        },
        Fail_Fetch(state, action) {
            state.loading = false;
            state.products = [];
            state.error = action.payload;
        },
        Fetch_DataDetails(state) {
            state.loading = true;
            state.error = '';
            state.productDetails = [];
        },
        Success_FetchDetails(state, action) {
            state.productDetails = action.payload;
            state.loading = false;
            state.error = ''
        },
        // Fail_Fetch(state, action) {
        //     state.loading = false;
        //     state.products = [];
        //     state.error = action.payload;
        // },
    },

})

export const ProductsAction = ProductsSlice.actions;
export default ProductsSlice.reducer
