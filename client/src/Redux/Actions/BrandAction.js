import axios from 'axios'
import getError from '../../Components/utile';
import { BrandAction } from './../Slices/BrandSlice';
import { FeaturesAction } from './../Slices/FeaturesSlice';
const url = process.env.REACT_APP_API_KEY

export const Upload_New_Brand = (brand, des, image, setImage, setInputs) => async (dispatch) => {
    try {
        dispatch(BrandAction.Upload_New_Brand_Request());
        const result = await axios.post(`${url}/api/brand/new`, { brand, des, image });
        dispatch(BrandAction.Upload_New_Brand_Success(result.data));
        setImage('')
        setInputs({ brand: '', des: '' });
    } catch (error) {
        dispatch(BrandAction.Upload_New_Brand_Fails(getError(error)));
    }
};

export const Fetch_Brand = () => async (dispatch) => {
    dispatch(BrandAction.Fetch_Brand_Request())
    try {
        const result = await axios.get(`${url}/api/brand/get`);
        dispatch(BrandAction.Fetch_Brand_Success(result.data));
    } catch (error) {
        dispatch(BrandAction.Fetch_Brand_Fails(getError(error)));
    }
};
export const Fetch_Brand_Details = (id) => async (dispatch) => {
    dispatch(BrandAction.Fetch_BrandDetails_Request())
    try {
        const result = await axios.get(`${url}/api/brand/get/${id}`);
        dispatch(BrandAction.Fetch_BrandDetails_Success(result.data));
    } catch (error) {
        dispatch(BrandAction.Fetch_BrandDetails_Fails(getError(error)));
    }
};
export const Delete_Brand = (id) => async (dispatch) => {
    dispatch(BrandAction.Delete_Brand_Request());
    try {
        const result = await axios.delete(`${url}/api/brand/delete/${id}`);
        dispatch(BrandAction.Delete_Brand_Success(result.data));
        dispatch(FeaturesAction.Show_ModalConfirm(false));
        dispatch(FeaturesAction.Show_SideBrandInfo(false));
    } catch (error) {
        dispatch(BrandAction.Delete_Brand_Fails(getError(error)));
    }
};
