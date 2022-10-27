import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { ProductsAction } from '../../Redux/Slices/ProductSlice'
import getError from './../../utile';
export const Get_AllProducts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const FetchData = async (dispatch) => {
            dispatch(ProductsAction.Fetch_Data())
            try {
                const result = await axios.get('http://localhost:5000/api/upload/fetch_products');
                dispatch(ProductsAction.Success_Fetch(result.data));
            } catch (error) {
                dispatch(ProductsAction.Fail_Fetch(getError(error)));
            }
        };
        FetchData();
    }, [dispatch]);
}
