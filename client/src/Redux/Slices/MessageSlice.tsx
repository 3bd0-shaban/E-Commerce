import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessageState {
    MSGsNotify: Array<string>;
    singleMSGNotify: { [key: string]: any };
}

const initialState: MessageState = {
    MSGsNotify: [],
    singleMSGNotify: {},
};

const MessageSlice = createSlice({
    name: 'MSGs',
    initialState,
    reducers: {
        setTotalMSGsNotify(state, action: PayloadAction<Array<string>>) {
            state.MSGsNotify = action.payload;
        },
        setSingleMSGNotify(state, action: PayloadAction<{ [key: string]: any }>) {
            state.singleMSGNotify = action.payload;
        },
    },
});

export const { setTotalMSGsNotify, setSingleMSGNotify } = MessageSlice.actions;
export default MessageSlice.reducer;

// export const selectTotalPosts = (state: RootState) => state.Posts.posts;
// export const selectSinglePost = (state: RootState) => state.Posts.singlepost;