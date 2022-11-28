import axios from 'axios'
import getError from '../../Components/utile';
import { BrandAction } from './../Slices/BrandSlice';

export const Upload_New_Brand = (brand, des, image) => async (dispatch) => {
    dispatch(BrandAction.Upload_New_Brand_Request());
    try {
        const result = await axios.post('http://localhost:5000/api/brand/new', { brand, des, image });
        dispatch(BrandAction.Upload_New_Brand_Success(result.data));
    } catch (error) {
        dispatch(BrandAction.Upload_New_Brand_Fails(getError(error)));
    }
};

export const Fetch_Brand = () => async (dispatch) => {
    dispatch(BrandAction.Fetch_Brand_Request())
    try {
        const result = await axios.get('http://localhost:5000/api/brand/get');
        dispatch(BrandAction.Fetch_Brand_Success(result.data));
    } catch (error) {
        dispatch(BrandAction.Fetch_Brand_Fails(getError(error)));
    }
};
export const Fetch_Brand_Details = (id) => async (dispatch) => {
    dispatch(BrandAction.Fetch_BrandDetails_Request())
    try {
        const result = await axios.get(`http://localhost:5000/api/brand/get/${id}`);
        dispatch(BrandAction.Fetch_BrandDetails_Success(result.data));
    } catch (error) {
        dispatch(BrandAction.Fetch_BrandDetails_Fails(getError(error)));
    }
};
export const Delete_Brand = (id) => async (dispatch) => {
    dispatch(BrandAction.Delete_Brand_Request());
    try {
        const result = await axios.delete(`http://localhost:5000/api/brand/delete/${id}`);
        dispatch(BrandAction.Delete_Brand_Success(result.data));
    } catch (error) {
        dispatch(BrandAction.Delete_Brand_Fails(getError(error)));
    }
};
