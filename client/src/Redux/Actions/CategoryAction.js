import axios from 'axios'
import getError from '../../Components/utile';
import { CategoryAction } from './../Slices/CategorySlice';
import { FeaturesAction } from './../Slices/FeaturesSlice';
const url = process.env.REACT_APP_API_KEY

export const Upload_New_Category = (category, nameOfSub, image, des, setImage, setInputs) => async (dispatch) => {
    dispatch(CategoryAction.Upload_New_Category_Request())
    try {
        const result = await axios.post(`${url}/api/category/new`, { category, nameOfSub, image, des });
        dispatch(CategoryAction.Upload_New_Category_Success(result.data));
        setImage('')
        setInputs({ category: '', des: '', nameOfSub: '' });
    } catch (error) {
        dispatch(CategoryAction.Upload_New_Category_Fails(getError(error)));
    }
};

export const Fetch_Category = () => async (dispatch) => {
    dispatch(CategoryAction.Fetch_Category_Request())
    try {
        const result = await axios.get(`${url}/api/category/get`);
        dispatch(CategoryAction.Fetch_Category_Success(result.data));
    } catch (error) {
        dispatch(CategoryAction.Fetch_Category_Fails(getError(error)));
    }
};
export const Fetch_Category_Details = (id) => async (dispatch) => {
    dispatch(CategoryAction.Fetch_CategoryDetails_Request())
    try {
        const result = await axios.get(`${url}/api/category/get/${id}`);
        dispatch(CategoryAction.Fetch_CategoryDetails_Success(result.data));
    } catch (error) {
        dispatch(CategoryAction.Fetch_CategoryDetails_Fails(getError(error)));
    }
};
export const Delete_Category = (id) => async (dispatch) => {
    dispatch(CategoryAction.Delete_Details_Request());
    try {
        const result = await axios.delete(`${url}/api/category/delete/${id}`);
        dispatch(CategoryAction.Delete_Category_Success(result.data));
        dispatch(FeaturesAction.Show_ModalConfirm(false));
        dispatch(FeaturesAction.Show_SideCategoryInfo(false));
    } catch (error) {
        dispatch(CategoryAction.Delete_Category_Fails(getError(error)));
    }
};