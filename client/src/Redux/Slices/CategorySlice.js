import { createSlice } from "@reduxjs/toolkit";

const Get_Category = createSlice({
    name: 'Category',
    initialState: {
        Category: [],
        laoding: false,
        error: null
    },
    reducers: {
        Fetch_Category_Request(state) {
            state.Category = [];
            state.laoding = true;
            state.error = null
        },
        Fetch_Category_Success(state, action) {
            state.Category = action.payload;
            state.laoding = true;
            state.error = null
        },
        Fetch_Category_Fails(state, action) {
            state.Category = [];
            state.laoding = false;
            state.error = action.payload
        },
    }

})
export const CategoryAction = Get_Category.actions
export default Get_Category.reducer