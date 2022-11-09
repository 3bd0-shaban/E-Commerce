import axios from 'axios'
import getError from '../../Components/utile';
import { CategoryAction } from './../Slices/CategorySlice';

export const Fetch_Category = () => async (dispatch) => {
    dispatch(CategoryAction.Fetch_Category_Request())
    try {
        const result = await axios.get('http://localhost:5000/api/category/get');
        dispatch(CategoryAction.Fetch_Category_Success(result.data));
    } catch (error) {
        dispatch(CategoryAction.Fetch_Category_Fails(getError(error)));
    }
};

