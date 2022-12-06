import { createSlice } from "@reduxjs/toolkit";

const Get_Category = createSlice({
    name: 'Category',
    initialState: {
        Category: [],
        UploadCategory: [],
        CategoryDetails: {},
        loading: false,
        success: null,
        error: null
    },
    reducers: {
        Upload_New_Category_Request(state) {
            state.UploadCategory = [];
            state.loading = true;
            state.error = null
        },
        Upload_New_Category_Success(state, action) {
            state.UploadCategory = action.payload;
            state.loading = false;
            state.success = 'Category added successfully';
            state.error = null
        },
        Upload_New_Category_Fails(state, action) {
            state.UploadCategory = [];
            state.loading = false;
            state.success = null;
            state.error = action.payload
        },
        Fetch_Category_Request(state) {
            state.Category = [];
            state.loading = true;
            state.error = null
        },
        Fetch_Category_Success(state, action) {
            state.Category = action.payload;
            state.loading = false;
            state.error = null
        },
        Fetch_Category_Fails(state, action) {
            state.Category = [];
            state.loading = false;
            state.success = null;
            state.error = action.payload
        },
        Fetch_CategoryDetails_Request(state) {
            state.CategoryDetails = {};
            state.loading = true;
            state.error = null
        },
        Fetch_CategoryDetails_Success(state, action) {
            state.CategoryDetails = action.payload;
            state.loading = false;
            state.error = null
        },
        Fetch_CategoryDetails_Fails(state, action) {
            state.loading = false;
            state.success = null;
            state.error = action.payload
        },
        Delete_Details_Request(state) {
            state.loading = true;
            state.error = null
        },
        Delete_Category_Success(state, action) {
            state.CategoryDetails = {};
            state.loading = false;
            state.success = action.payload.msg;
            state.error = null
        },
        Delete_Category_Fails(state, action) {
            state.loading = false;
            state.success = null;
            state.error = action.payload
        },
        Update_Category_Request(state) {
            state.loading = true;
            state.error = null
        },
        Update_Category_Success(state, action) {
            state.CategoryDetails = {};
            state.loading = false;
            state.success = action.payload.msg;
            state.error = null
        },
        Update_Category_Fails(state, action) {
            state.loading = false;
            state.success = null;
            state.error = action.payload
        },
    }

})
export const CategoryAction = Get_Category.actions
export default Get_Category.reducer