import { createSlice } from "@reduxjs/toolkit"
const UploadProductSlice = createSlice({
    name: "Upload_Product",
    initialState: {
        loading: false,
        image: '',
        error: '',
        success: '',
        product: [],
    },
    reducers: {
        Upload_Image_Request(state) {
            state.loading = true;
            state.error = '';
        },
        Upload_Image_Success(state, action) {
            state.loading = false;
            state.error = '';
            state.image = action.payload;
            state.success = 'Image uploaded successfully ........';
        },
        Fail_UploadImage(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.success = 'failed uploading';

        },
        Upload_Data(state) {
            state.loading = true;
            state.error = '';
            state.product = [];
            state.success = '';
        },
        Success_Upload(state, action) {
            state.product = action.payload.Uploaded_Product;
            state.loading = false;
            state.error = '';
            state.success = action.payload.msg;
        },
        Fail_Upload(state, action) {
            state.loading = false;
            state.product = [];
            state.error = action.payload;
            state.success = '';

        },

    },

})

export const UploadProductAction = UploadProductSlice.actions;
export default UploadProductSlice.reducer
