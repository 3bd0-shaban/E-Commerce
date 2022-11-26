import { createSlice } from "@reduxjs/toolkit";

const Reviews = createSlice({
    name: 'Reviews',
    initialState: {
        Reviews: [],
        loading: false,
        error: null
    },
    reducers: {
        Set_New_Review_Request(state) {
            state.loading = true;
            state.error = null
        },
        Set_New_Review_Success(state, action) {
            state.Reviews = action.payload;
            state.loading = true;
            state.error = null
        },
        Set_New_Review_Fails(state, action) {
            state.loading = false;
            state.error = action.payload
        },
        Fetch_Reviews_Request(state) {
            state.loading = true;
            state.error = null
        },
        Fetch_Reviews_Success(state, action) {
            state.Reviews = action.payload;
            state.loading = true;
            state.error = null
        },
        Fetch_Reviews_Fails(state, action) {
            state.loading = false;
            state.error = action.payload
        },
        Delete_Review_Request(state) {
            state.loading = false;
            state.error = null
        },
        Delete_Review_Success(state, action) {
            state.Reviews = action.payload;
            state.loading = false;
            state.error = null
        },
        Delete_Review_Fails(state, action) {
            state.loading = false;
            state.error = action.payload.msg
        },
    }

})
export const ReviewsAction = Reviews.actions
export default Reviews.reducer