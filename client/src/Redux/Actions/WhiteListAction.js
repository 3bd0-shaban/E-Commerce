import axios from 'axios'
import getError from '../../Components/utile';
import { White_ListAction } from './../Slices/WhiteListSlice';
const url = process.env.REACT_APP_API_KEY

export const Add_to_Whitelist = (id) => async (dispatch) => {
    try {
        dispatch(White_ListAction.Add_to_WhiteList_Request());
        const res = await axios.post(`${url}/api/whitelist/new/${id}`);
        dispatch(White_ListAction.Add_to_WhiteList_Success(res.data));
    } catch (error) {
        dispatch(White_ListAction.Add_to_WhiteList_Fails(getError(error)));
    }
};

export const Fetch_Products_In_WhiteList = () => async (dispatch) => {
    try {
        dispatch(White_ListAction.Fetch_WhiteList_Request());
        const res = await axios.get(`${url}/api/whitelist/get`);
        dispatch(White_ListAction.Fetch_WhiteList_Success(res.data));
    } catch (error) {
        dispatch(White_ListAction.Fetch_WhiteList_Fails(getError(error)));
    }
};
export const Delete_Items_In_WhiteList = (id) => async (dispatch) => {
    try {
        dispatch(White_ListAction.Delete_WhiteList_Request());
        const res = await axios.post(`${url}/api/whitelist/deleteall`, { id });
        dispatch(White_ListAction.Delete_WhiteList_Success(res.data));
    } catch (error) {
        dispatch(White_ListAction.Delete_WhiteList_Fails(getError(error)));
    }
};
export const Delete_Specific_Item_In_WhiteList = (productId) => async (dispatch) => {
    try {
        dispatch(White_ListAction.Delete_WhiteList_Request());
        const res = await axios.post(`${url}/api/whitelist/delete/${productId}`);
        dispatch(White_ListAction.Delete_WhiteList_Success(res.data));
    } catch (error) {
        dispatch(White_ListAction.Delete_WhiteList_Fails(getError(error)));
    }
};

