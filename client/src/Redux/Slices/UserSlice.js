import { createSlice } from "@reduxjs/toolkit"
const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        error: '',
        token: '',
        isLogged: false,
        idAdmin: false
    },
    reducers: {
        LoggedIn(state, action) {
            state.user = action.payload;
            state.isLogged = true;
            state.idAdmin = false;
        },
        Admin(state, action) {
            state.user = action.payload;
            state.isLogged = true;
            state.idAdmin = true;
        },
        LogOut(state, action) {
            state.user = [];
            state.isLogged = false;
            state.idAdmin = false;

        },
        AccessToken(state, action) {
            state.token = localStorage.getItem('token') ? action.payload : '';
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
