import { createSlice } from "@reduxjs/toolkit"
const UploadProductSlice = createSlice({
    name: "Upload_Product",
    initialState: {
        loading: false,
        error: '',
        success:'',
        product: [],
    },
    reducers: {
        Upload_Data(state) {
            state.loading = true;
            state.error = '';
            state.product = [];
            state.success='';
        },
        Success_Upload(state, action) {
            state.product = action.payload.Uploaded_Product;
            state.loading = false;
            state.error = '';
            state.success=action.payload.msg;
        },
        Fail_Upload(state, action) {
            state.loading = false;
            state.product = [];
            state.error = action.payload;
            state.success='';

        },
    },

})

export const UploadProductAction = UploadProductSlice.actions;
export default UploadProductSlice.reducer
