import axios from 'axios'
import getError from '../../Components/utile';

import { CategoryAction } from './../Slices/CategorySlice';
export const Upload_New_Category = (category, nameOfSub, image, des) => async (dispatch) => {
    dispatch(CategoryAction.Upload_New_Category_Request())
    try {
        const result = await axios.post('/api/category/new', { category, nameOfSub, image, des });
        dispatch(CategoryAction.Upload_New_Category_Success(result.data));
    } catch (error) {
        dispatch(CategoryAction.Upload_New_Category_Fails(getError(error)));
    }
};

export const Fetch_Category = () => async (dispatch) => {
    dispatch(CategoryAction.Fetch_Category_Request())
    try {
        const result = await axios.get('/api/category/get');
        dispatch(CategoryAction.Fetch_Category_Success(result.data));
    } catch (error) {
        dispatch(CategoryAction.Fetch_Category_Fails(getError(error)));
    }
};
export const Fetch_Category_Details = (id) => async (dispatch) => {
    dispatch(CategoryAction.Fetch_CategoryDetails_Request())
    try {
        const result = await axios.get(`/api/category/get/${id}`);
        dispatch(CategoryAction.Fetch_CategoryDetails_Success(result.data));
    } catch (error) {
        dispatch(CategoryAction.Fetch_CategoryDetails_Fails(getError(error)));
    }
};
