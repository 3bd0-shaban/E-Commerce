import axios from 'axios'
import getError from '../../Components/utile';
import { ProductsAction } from '../../Redux/Slices/ProductSlice'
import { UploadProductAction } from './../Slices/UploadProductSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = process.env.REACT_APP_API_KEY
export const Get_AllProducts = () => async (dispatch) => {
    dispatch(ProductsAction.Fetch_Products_Request())
    try {
        const result = await axios.get(`${url}/api/product/get`);
        dispatch(ProductsAction.Fetch_Products_Success(result.data));
    } catch (error) {
        dispatch(ProductsAction.Fetch_Products_Fails(getError(error)));
    }

}
export const Get_Products = createApi({
    reducerPath: 'Get_Products_Reducer',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    endpoints: (builder) => ({
        ProductQuery: builder.query({
            query: () => '/api/product/get',
        })
    })
})
export const Fetch_Product_Details = (id) => async (dispatch) => {


    dispatch(ProductsAction.Fetch_ProductDetails_Request())
    try {
        const result = await axios.get(`${url}/api/product/get/${id}`);
        dispatch(ProductsAction.Fetch_FetchDetails_Success(result.data));
    } catch (error) {
        dispatch(ProductsAction.Fetch_FetchDetails_Fails(getError(error)));
    }
};

export const Upload_Product = (images, name, des, stock, price, brand, category, subcategory, setImages, setInputs) => async (dispatch) => {
    if (!images) {
        dispatch(UploadProductAction.Fail_Upload(getError('No Images founded Please upload one image at least')));
    }
    if (!images) return;
    try {
        dispatch(UploadProductAction.Upload_Data());
        const res = await axios.post(`${url}/api/product/upload`, { images, name, des, stock, price, brand, category, subcategory });
        dispatch(UploadProductAction.Success_Upload(res.data));
        setImages('');
        setInputs({ name: '', des: '', stock: '', price: '', brand: '', category: '', subcategory: '' });
    } catch (error) {
        dispatch(UploadProductAction.Fail_Upload(getError(error)));
    }
}
export const { useProductQuery } = Get_Products