import { createSlice } from "@reduxjs/toolkit";

const White_List = createSlice({
    name: 'White_List',
    initialState: {
        Products: [],
        loading: false,
        error: null
    },
    reducers: {
        Add_to_WhiteList_Request(state) {
            state.Products = [];
            state.loading = true;
            state.error = null
        },
        Add_to_WhiteList_Success(state, action) {
            state.Products = action.payload;
            state.loading = true;
            state.error = null
        },
        Add_to_WhiteList_Fails(state, action) {
            state.Products = [];
            state.loading = false;
            state.error = action.payload
        },
        Fetch_WhiteList_Request(state) {
            state.Products = [];
            state.loading = true;
            state.error = null
        },
        Fetch_WhiteList_Success(state, action) {
            state.Products = action.payload;
            state.loading = true;
            state.error = null
        },
        Fetch_WhiteList_Fails(state, action) {
            state.Products = [];
            state.loading = false;
            state.error = action.payload
        },
        Delete_WhiteList_Request(state) {
            state.loading = false;
            state.error = null
        },
        Delete_WhiteList_Success(state, action) {
            state.Products = action.payload;
            state.loading = false;
            state.error = null
        },
        Delete_WhiteList_Fails(state, action) {
            state.loading = false;
            state.error = action.payload.msg
        },
    }

})
export const White_ListAction = White_List.actions
export default White_List.reducer