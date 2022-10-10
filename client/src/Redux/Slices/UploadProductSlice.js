import { createSlice } from "@reduxjs/toolkit"
const UploadProductSlice = createSlice({
    name: "Upload_Product",
    initialState: {
        loading: false,
        error: '',
        product: [],
    },
    reducers: {
        Fetch_Data(state) {
            state.loading = true;
            state.error = '';
            state.product = [];
        },
        Success_Fetch(state, action) {
            state.product = action.payload;
            state.loading = false;
            state.error = ''
        },
        Fail_Fetch(state, action) {
            state.loading = false;
            state.product = [];
            state.error = action.payload;
        },
    },

})

export const UploadProductAction = UploadProductSlice.actions;
export default UploadProductSlice.reducer
