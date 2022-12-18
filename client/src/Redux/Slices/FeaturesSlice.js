import { createSlice } from "@reduxjs/toolkit"
const FeaturesSlice = createSlice({
    name: "Upload_Product",
    initialState: {
        SideBar: false,
        SideCategoryInfo: false,
        IsModalConfirm: false,
        SideBrandInfo: false,
        sideUserInfo: false,
        sideProductInfo: false,
        sideOrderInfo: false,
        HomeSideBar: false
    },
    reducers: {
        ShowSideBar(state) {
            state.SideBar = !state.SideBar;
        },
        Show_SideCategoryInfo(state) {
            state.SideCategoryInfo = !state.SideCategoryInfo;
        },
        Show_SideBrandInfo(state) {
            state.SideBrandInfo = !state.SideBrandInfo;
        },
        Show_sideUserInfo(state) {
            state.sideUserInfo = !state.sideUserInfo;
        },
        Show_sideProductInfo(state) {
            state.sideProductInfo = !state.sideProductInfo;
        },
        Show_sideOrderInfo(state) {
            state.sideOrderInfo = !state.sideOrderInfo;
        },
        Show_ModalConfirm(state) {
            state.IsModalConfirm = !state.IsModalConfirm;
        },
        Show_HomeSideBar(state) {
            state.HomeSideBar = !state.HomeSideBar;
        },
    },

})

export const FeaturesAction = FeaturesSlice.actions;
export default FeaturesSlice.reducer
