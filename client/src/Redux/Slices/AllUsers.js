import { createSlice } from "@reduxjs/toolkit";
const getAllUsers = createSlice({
    name: 'allusers',
    initialState: {
        AllUsers: [],
        error: '',
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
        }
    }
});
export const AllUsersAction = getAllUsers.actions
export default getAllUsers.reducer