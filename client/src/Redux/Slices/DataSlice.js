import { createSlice } from "@reduxjs/toolkit"
const DataSlice = createSlice({
    name: "Data",
    initialState: {
        email: '',
        search:[]

    },
    reducers: {
        setEmail(state, action) {
            state.email = action.payload;
        },
        setSearch(state, action) {
            state.email = action.payload;
        },
    },

})

export const DataAction = DataSlice.actions;
export default DataSlice.reducer
