import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    user: { [key: string]: any };
    token: string | null;
}

const initialState: UserState = {
    user: {},
    token: null,
};

const UserSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<{ user: { [key: string]: any }, token: string }>) {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        LogOut(state) {
            state.user = {};
            state.token = null;
        },
    },
});

export const { setCredentials, LogOut } = UserSlice.actions;
export default UserSlice.reducer;

export const selectCurrentUser = (state: { auth: UserState }) => state.auth.user;
export const selectCurrentToken = (state: { auth: UserState }) => state.auth.token;