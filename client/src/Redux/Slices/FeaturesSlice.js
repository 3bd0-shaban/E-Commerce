import { createSlice } from "@reduxjs/toolkit"
const FeaturesSlice = createSlice({
    name: "Upload_Product",
    initialState: {
        SideBar: false,
        SideCategoryInfo: false,
        IsModalConfirm:false

    },
    reducers: {
        ShowSideBar(state) {
            state.SideBar = !state.SideBar;
        },
        Show_SideCategoryInfo(state) {
            state.SideCategoryInfo = !state.SideCategoryInfo;
        },
        Show_ModalConfirm(state) {
            state.IsModalConfirm = !state.IsModalConfirm;
        }
    },

})

export const FeaturesAction = FeaturesSlice.actions;
export default FeaturesSlice.reducer
