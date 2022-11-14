import axios from 'axios'
import getError from '../../Components/utile';
import { IssessAction } from './../Slices/IssessSlice';

export const Add_New_Issess = () => async (dispatch) => {
    try {
        dispatch(IssessAction.Set_New_Issess_Request());
        const res = await axios.post('http://localhost:5000/api/issess/new');
        dispatch(IssessAction.Set_New_Issess_Success(res.data));
    } catch (error) {
        dispatch(IssessAction.Set_New_Issess_Fails(getError(error)));
    }
};

export const Fetch_All_Issess = () => async (dispatch) => {
    try {
        dispatch(IssessAction.Fetch_Issess_Request());
        const res = await axios.get('http://localhost:5000/api/issess/get');
        dispatch(IssessAction.Fetch_Issess_Success(res.data));
    } catch (error) {
        dispatch(IssessAction.Fetch_Issess_Fails(getError(error)));
    }
};
export const Delete_Issess = (id) => async (dispatch) => {
    try {
        dispatch(IssessAction.Delete_Issess_Request());
        const res = await axios.post(`http://localhost:5000/api/issess/delete/${id}`);
        dispatch(IssessAction.Delete_Issess_Success(res.data));
    } catch (error) {
        dispatch(IssessAction.Fetch_Issess_Fails(getError(error)));
    }
};