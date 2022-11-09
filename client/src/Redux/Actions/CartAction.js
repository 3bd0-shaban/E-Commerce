import axios from 'axios'
import getError from '../../Components/utile';
import { CartActions } from './../Slices/CartSlice';

export const Add_to_cart = (products, userId) => async (dispatch) => {
    try {// eslint-disable-next-line
        dispatch(CartActions.Addtocart_Request());
        const res = await axios.post('http://localhost:5000/api/cart/new', { products, userId });
        dispatch(CartActions.Addtocart_Success(res.data));
    } catch (error) {
        dispatch(CartActions.Addtocart_Fails(getError(error)));
    }
};

