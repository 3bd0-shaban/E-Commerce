import { createSlice } from "@reduxjs/toolkit"
import { useCookies } from 'react-cookie'
const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: '',
        error: null,
        success: null,
        token: null,
        isLogged: false,
        isAdmin: false
    },
    reducers: {
        LoggedIn(state, action) {
            // const [cookies, setCookie] = useCookies([action.payload.auth[0]._id]);
            state.user = action.payload.auth;
            state.isLogged = true;
            state.isAdmin = action.payload.auth[0].isAdmin;
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
        Admin(state, action) {
            state.user = action.payload;
            state.isLogged = true;
            state.isAdmin = true;
            state.error = ''
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
            state.idAdmin = false;
            state.error = action.payload;
        }
    }
})
export const UserAction = UserSlice.actions;
export default UserSlice.reducer
