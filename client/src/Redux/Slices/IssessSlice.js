import { createSlice } from "@reduxjs/toolkit";

const Report_Issess = createSlice({
    name: 'Issess',
    initialState: {
        Issess: [],
        loading: false,
        error: null
    },
    reducers: {
        Set_New_Issess_Request(state) {
            state.Issess = [];
            state.loading = true;
            state.error = null
        },
        Set_New_Issess_Success(state, action) {
            state.Issess = action.payload;
            state.loading = true;
            state.error = null
        },
        Set_New_Issess_Fails(state, action) {
            state.Issess = [];
            state.loading = false;
            state.error = action.payload
        },
        Fetch_Issess_Request(state) {
            state.Issess = [];
            state.loading = true;
            state.error = null
        },
        Fetch_Issess_Success(state, action) {
            state.Issess = action.payload;
            state.loading = true;
            state.error = null
        },
        Fetch_Issess_Fails(state, action) {
            state.Issess = [];
            state.loading = false;
            state.error = action.payload
        },
        Delete_Issess_Request(state) {
            state.loading = false;
            state.error = null
        },
        Delete_Issess_Success(state, action) {
            state.Issess = action.payload;
            state.loading = false;
            state.error = null
        },
        Delete_Issess_Fails(state, action) {
            state.loading = false;
            state.error = action.payload.msg
        },
    }

})
export const IssessAction = Report_Issess.actions
export default Report_Issess.reducer