import axios from 'axios'
import getError from '../../Components/utile';
import { ProductsAction } from '../../Redux/Slices/ProductSlice'
export const Get_AllProducts = () => async (dispatch) => {
    dispatch(ProductsAction.Fetch_Products_Request())
    try {
        const result = await axios.get('http://localhost:5000/api/upload/fetch_products');
        dispatch(ProductsAction.Fetch_Products_Success(result.data));
    } catch (error) {
        dispatch(ProductsAction.Fetch_Products_Fails(getError(error)));
    }

}
