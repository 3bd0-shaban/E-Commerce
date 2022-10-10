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
            state.error = ''
        },
        Register(state, action) {
            state.user = [];
            state.isLogged = false;
            state.idAdmin = action.payload.data.isAdmin ? true : false;
            state.error = ''
        },
        Admin(state, action) {
            state.user = action.payload;
            state.isLogged = true;
            state.idAdmin = true;
            state.error = ''
        },
        LogOut(state) {
            state.user = [];
            state.isLogged = false;
            state.idAdmin = false;
            state.error = ''

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
