import { createSlice } from "@reduxjs/toolkit"
const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: '',
        UserDetails: {},
        error: null,
        success: null,
        token: null,
        isLogged: localStorage.getItem('Logged?') ? true : false,
        isAdmin: localStorage.getItem('isAdmin?') ? true : false
    },
    reducers: {
        LoggedIn(state, action) {
            state.isLogged = localStorage.getItem('Logged?') ? true : false;
            state.isAdmin = localStorage.getItem('isAdmin?') ? true : false;
            state.error = '';
            state.success = action.payload.msg;
        },
        Register(state, action) {
            state.user = [];
            state.isLogged = false;
            state.isAdmin = false;
            state.error = '';
            state.success = action.payload;
        },
        Admin(state) {
            state.isLogged = true;
            state.isAdmin = true;
            state.error = ''
        },
        GetUserInfo(state, action) {
            state.user = action.payload;
            state.error = '';
            state.success = action.payload.msg;
        },
        LogOut(state) {
            state.user = [];
            state.isLogged = false;
            state.isAdmin = false;
            state.error = '';
            state.success = '';
        },
        AccessToken(state, action) {
            state.token = action.payload;
            state.error = ''
        },
        Failed_LogIn(state, action) {
            state.user = [];
            state.isLogged = false;
            state.isAdmin = false;
            state.error = action.payload;
        },
        Failed_Fetch(state, action) {
            state.error = action.payload;
        },
        Fetch_UserDetails_Request(state) {
            state.UserDetails = {};
            state.laoding = true;
            state.error = null
        },
        Fetch_UserDetails_Success(state, action) {
            state.UserDetails = action.payload;
            state.laoding = false;
            state.error = null
        },
        Fetch_UserDetails_Fails(state, action) {
            state.laoding = false;
            state.error = action.payload
        },
    }
})
export const UserAction = UserSlice.actions;
export default UserSlice.reducer
