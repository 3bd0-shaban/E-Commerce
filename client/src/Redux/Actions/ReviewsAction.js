import axios from 'axios'
import getError from '../../Components/utile';
import { ReviewsAction } from './../Slices/ReviewsSlice';
const url = process.env.REACT_APP_API_KEY

export const Add_New_Review = (id, comment, rating) => async (dispatch) => {
    try {
        dispatch(ReviewsAction.Set_New_Review_Request());
        const res = await axios.post(`${url}/api/review/new/${id}`, { comment, rating });
        dispatch(ReviewsAction.Set_New_Review_Success(res.data));
    } catch (error) {
        dispatch(ReviewsAction.Set_New_Review_Fails(getError(error)));
    }
};

export const Fetch_Product_review = (id) => async (dispatch) => {
    try {
        dispatch(ReviewsAction.Fetch_Reviews_Request());
        const res = await axios.get(`${url}/api/review/get/${id}`);
        dispatch(ReviewsAction.Fetch_Reviews_Success(res.data));
    } catch (error) {
        dispatch(ReviewsAction.Set_New_Review_Fails(getError(error)));
    }
};
export const Delete_Review = (id) => async (dispatch) => {
    try {
        dispatch(ReviewsAction.Delete_Review_Request());
        const res = await axios.post(`${url}/api/review/delete/${id}`);
        dispatch(ReviewsAction.Delete_Review_Success(res.data));
    } catch (error) {
        dispatch(ReviewsAction.Fetch_Reviews_Fails(getError(error)));
    }
};
// export const Delete_Specific_Item_In_review = (_id) => async (dispatch) => {
//     try {
//         dispatch(ReviewsAction.Delete_Review_Request());
//         const res = await axios.post(`/api/review/delete/${_id}`);
//         dispatch(ReviewsAction.Delete_Review_Success(res.data));
//     } catch (error) {
//         dispatch(ReviewsAction.Fetch_Reviews_Fails(getError(error)));
//     }
// };

