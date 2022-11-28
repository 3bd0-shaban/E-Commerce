import { createSlice } from "@reduxjs/toolkit";

const Get_Category = createSlice({
    name: 'Category',
    initialState: {
        Category: [],
        UploadCategory: [],
        CategoryDetails: {},
        laoding: false,
        success: null,
        error: null
    },
    reducers: {
        Upload_New_Category_Request(state) {
            state.UploadCategory = [];
            state.laoding = true;
            state.error = null
        },
        Upload_New_Category_Success(state, action) {
            state.UploadCategory = action.payload;
            state.laoding = false;
            state.success = 'Category added successfully';
            state.error = null
        },
        Upload_New_Category_Fails(state, action) {
            state.UploadCategory = [];
            state.laoding = false;
            state.error = action.payload
        },
        Fetch_Category_Request(state) {
            state.Category = [];
            state.laoding = true;
            state.error = null
        },
        Fetch_Category_Success(state, action) {
            state.Category = action.payload;
            state.laoding = false;
            state.error = null
        },
        Fetch_Category_Fails(state, action) {
            state.Category = [];
            state.laoding = false;
            state.error = action.payload
        },
        Fetch_CategoryDetails_Request(state) {
            state.CategoryDetails = {};
            state.laoding = true;
            state.error = null
        },
        Fetch_CategoryDetails_Success(state, action) {
            state.CategoryDetails = action.payload;
            state.laoding = false;
            state.error = null
        },
        Fetch_CategoryDetails_Fails(state, action) {
            state.laoding = false;
            state.error = action.payload
        },
    }

})
export const CategoryAction = Get_Category.actions
export default Get_Category.reducer