import { createSlice } from "@reduxjs/toolkit"
const ProductsSlice = createSlice({
    name: "products",
    initialState: {
        loading: false,
        error: '',
        products: [],
    },
    reducers: {
        Fetch_Data(state) {
            state.loading = true
        },
        Success_Fetch(state, action) {
            state.products = action.payload;
            state.loading = false
        },
        Fail_Fetch(state, action) {
            state.loading = false;
            state.error = action.payload
        },
    },

})

export const ProductsAction = ProductsSlice.actions;
export default ProductsSlice.reducer
// export const userSelector = state => state.user