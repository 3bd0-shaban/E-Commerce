import { createSlice } from "@reduxjs/toolkit"
const DataSlice = createSlice({
    name: "Data",
    initialState: {
        email: '',

    },
    reducers: {
        setEmail(state, action) {
            state.email = action.payload;
        },
    },

})

export const DataAction = DataSlice.actions;
export default DataSlice.reducer
