import axios from 'axios'
import getError from '../../Components/utile';
import { CartActions } from './../Slices/CartSlice';

export const Add_to_cart = (product_Id) => async (dispatch) => {
    try {
        dispatch(CartActions.Addtocart_Request());
        const res = await axios.post('http://localhost:5000/api/cart/new', { product_Id });
        dispatch(CartActions.Addtocart_Success(res.data));
    } catch (error) {
        dispatch(CartActions.Addtocart_Fails(getError(error)));
    }
};

export const Fetch_Products_In_Cart = () => async (dispatch) => {
    try {
        dispatch(CartActions.FetchCart_Request());
        const res = await axios.get('http://localhost:5000/api/cart/get');
        dispatch(CartActions.FetchCart_Success(res.data));
    } catch (error) {
        dispatch(CartActions.FetchCart_Fails(getError(error)));
    }
};
export const Increment = (product_Id) => async (dispatch) => {
    try {
        dispatch(CartActions.Increment_Item_Request());
        const res = await axios.post('http://localhost:5000/api/cart/increment', { product_Id });
        dispatch(CartActions.Increment_Item_Success(res.data));
    } catch (error) {
        dispatch(CartActions.Increment_Item_Fails(getError(error)));
    }
};
export const Dectrement = (product_Id) => async (dispatch) => {
    try {
        dispatch(CartActions.Decrement_Item_Request());
        const res = await axios.post('http://localhost:5000/api/cart/decrement', { product_Id });
        dispatch(CartActions.Decrement_Item_Success(res.data));
    } catch (error) {
        dispatch(CartActions.Decrement_Item_Fails(getError(error)));
    }
};
export const Delete_Items_In_Cart = (product_Id) => async (dispatch) => {
    try {
        dispatch(CartActions.DeleteCart_Request());
        const res = await axios.post('http://localhost:5000/api/cart/deleteall', { product_Id });
        dispatch(CartActions.DeleteCart_Success(res.data));
    } catch (error) {
        dispatch(CartActions.DeleteCart_Fails(getError(error)));
    }
};
export const Delete_Specific_Item_In_Cart = (product_Id) => async (dispatch) => {
    try {
        dispatch(CartActions.DeleteCart_Request());
        const res = await axios.post('http://localhost:5000/api/cart/delete', { product_Id });
        dispatch(CartActions.DeleteCart_Success(res.data));
    } catch (error) {
        dispatch(CartActions.DeleteCart_Fails(getError(error)));
    }
};

