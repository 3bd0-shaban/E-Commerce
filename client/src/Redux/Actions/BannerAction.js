import axios from 'axios'
import getError from '../../Components/utile';
import { Get_BannersAction } from './../Slices/BannersSlice';

export const Upload_Banner = (setPreview, preview) => async (dispatch) => {
    try {
        dispatch(Get_BannersAction.uploading_Banners_Request());
        const res = await axios.post('http://localhost:5000/api/banner/new', { preview });
        dispatch(Get_BannersAction.uploading_Banners_Success(res.data));
        setPreview()
    } catch (error) {
        dispatch(Get_BannersAction.uploading_Banners_Fails(getError(error)));
    }

}
