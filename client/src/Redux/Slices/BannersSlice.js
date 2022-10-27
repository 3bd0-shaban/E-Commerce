import { createSlice } from "@reduxjs/toolkit";
const Get_BannersSlice = createSlice({
    name: 'Banners',
    initialState: {
        loading: false,
        error: null,
        success:null,
        Banners: []
    },
    reducers: {
        Fetch_Banners_Request(state) {
            state.loading = true;
            state.Banners = [];
            state.error = '';
            state.success = '';
        },
        Fetch_Banners_Success(state, action) {
            state.loading = false;
            state.Banners = action.payload;
            state.error = '';
            state.success = '';
        },
        Fetch_Banners_Fails(state, action) {
            state.loading = false;
            state.Banners = [];
            state.error = action.payload.msg;
        },
        uploading_Banners_Request(state) {
            state.loading = true;
            state.Banners = [];
            state.error = '';
            state.success = '';
        },
        uploading_Banners_Success(state, action) {
            state.loading = false;
            state.success = action.payload.msg;
        },
        uploading_Banners_Fails(state, action) {
            state.loading = false;
            state.Banners = [];
            state.error = action.payload.msg;
            state.success = '';
        }

    }
})
export const Get_BannersAction = Get_BannersSlice.actions
export default Get_BannersSlice.reducer