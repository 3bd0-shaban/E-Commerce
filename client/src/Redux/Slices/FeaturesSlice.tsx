'use client';
import { createSlice } from '@reduxjs/toolkit';
interface FeaturesProps {
    DocSide: Boolean;
}
const initialState: FeaturesProps = {
    DocSide: false,
}
const FeaturesSlice = createSlice({
    name: "Features",
    initialState: {
        SideBar: false,
        SideCategoryInfo: false,
        IsModalConfirm: false,
        SideBrandInfo: false,
        sideUserInfo: false,
        sideProductInfo: false,
        sideOrderInfo: false,
        HomeSideBar: false,
        ConfirmModal: false,
        DocSide: false,

    },
    reducers: {
        ShowSideBar(state) {
            state.SideBar = !state.SideBar;
        },
        setDocSide(state) {
            state.DocSide = !state.DocSide;
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
        Show_Confirm(state) {
            state.ConfirmModal = !state.ConfirmModal;
        }
    },

})
export const FeaturesAction = FeaturesSlice.actions;
export default FeaturesSlice.reducer;
