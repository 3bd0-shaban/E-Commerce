import { createSlice } from "@reduxjs/toolkit";
const TokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: '',
    },
    reducers: {
        AccessToken(state, action) {
            state.token = action.payload;
        }
    }
});
export const TokenAction = TokenSlice.actions
export default TokenSlice.reducer