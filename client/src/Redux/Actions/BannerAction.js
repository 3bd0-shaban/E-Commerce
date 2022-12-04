import axios from 'axios'
import getError from '../../Components/utile';
import { Get_BannersAction } from './../Slices/BannersSlice';
const url = process.env.REACT_APP_API_KEY

export const Upload_Banner = (setImage, image) => async (dispatch) => {
    try {
        dispatch(Get_BannersAction.uploading_Banners_Request());
        const res = await axios.post(`${url}/api/banner/new`, { image });
        dispatch(Get_BannersAction.uploading_Banners_Success(res.data));
        setImage()
    } catch (error) {
        dispatch(Get_BannersAction.uploading_Banners_Fails(getError(error)));
    }

}
