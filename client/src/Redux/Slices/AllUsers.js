import { createSlice } from "@reduxjs/toolkit";
const getAllUsers = createSlice({
    name: 'allusers',
    initialState: {
        AllUsers: [],
        error: null,
        success: null,
        loading: false
    },
    reducers: {
        Fetch_getAllUsers(state, action) {
            state.AllUsers = [];
            state.error = action.payload
            state.loading = true
        },
        getAllUsers(state, action) {
            state.loading = false;
            state.AllUsers = action.payload;
            state.error = ''
        },
        Fail_getAllUsers(state, action) {
            state.AllUsers = [];
            state.error = action.payload
            state.loading = false
        },
        Delete_User_Request(state, action) {
            state.loading = true;
            state.error = null;
            state.success = null
        },
        Delete_User_Success(state, action) {
            state.loading = false;
            state.error = null;
            state.success = action.payload.msg
        },
        Delete_User_Fails(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.success = null
        },
    }
});
export const AllUsersAction = getAllUsers.actions
export default getAllUsers.reducer