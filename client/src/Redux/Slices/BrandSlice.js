import { createSlice } from "@reduxjs/toolkit";

const BrandSlice = createSlice({
    name: 'Category',
    initialState: {
        Brand: [],
        UploadBrand: [],
        BrandDetails: {},
        loading: false,
        success: null,
        error: null
    },
    reducers: {
        Upload_New_Brand_Request(state) {
            state.UploadBrand = [];
            state.loading = true;
            state.error = null
        },
        Upload_New_Brand_Success(state, action) {
            state.UploadBrand = action.payload;
            state.loading = false;
            state.success = 'Brand added successfully';
            state.error = null
        },
        Upload_New_Brand_Fails(state, action) {
            state.UploadBrand = [];
            state.loading = false;
            state.success = null;
            state.error = action.payload
        },
        Fetch_Brand_Request(state) {
            state.Brand = [];
            state.loading = true;
            state.error = null
        },
        Fetch_Brand_Success(state, action) {
            state.Brand = action.payload;
            state.loading = false;
            state.success = null;
            state.error = null
        },
        Fetch_Brand_Fails(state, action) {
            state.Brand = [];
            state.loading = false;
            state.success = null;
            state.error = action.payload
        },
        Fetch_BrandDetails_Request(state) {
            state.BrandDetails = {};
            state.loading = true;
            state.error = null
        },
        Fetch_BrandDetails_Success(state, action) {
            state.BrandDetails = action.payload;
            state.loading = false;
            state.error = null
        },
        Fetch_BrandDetails_Fails(state, action) {
            state.loading = false;
            state.success = null;
            state.error = action.payload
        },
        Delete_Brand_Request(state) {
            state.loading = true;
            state.error = null
        },
        Delete_Brand_Success(state, action) {
            state.loading = false;
            state.error = null;
            state.success = action.payload.msg;
        },
        Delete_Brand_Fails(state, action) {
            state.loading = false;
            state.success = null;
            state.error = action.payload
        },
    }

})
export const BrandAction = BrandSlice.actions
export default BrandSlice.reducer