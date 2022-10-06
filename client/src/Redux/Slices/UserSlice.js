import { createSlice } from "@reduxjs/toolkit"
const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        error: '',
        isLogged: false,
        idAdmin: false
    },
    reducers: {
        LoggedIn(state,action) {
            state.user = action.payload;
            state.isLogged = true;
            state.isadmin = false;
        },
        Admin (state,action){
            state.user = action.payload;
            state.isLogged=true;
            state.isadmin = true;
        },
        LogOut (state){
            state.user = [];
            state.isLogged=false;
            state.isadmin = false;
        },
        Failed_LogIn (state,action){
            state.user = [];
            state.isLogged=false;
            state.isadmin = false;
            state.error = action.payload
        }
    }
})
export const UserAction = UserSlice.actions;
export default UserSlice.reducer
// export const userSelector = state => state.user