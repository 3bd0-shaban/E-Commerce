import { configureStore } from '@reduxjs/toolkit'
import ProductsSlice from "./Slices/ProductSlice";
import UserSlice from "./Slices/UserSlice";
import Get_BannersSlice from "./Slices/BannersSlice";
import UploadProductSlice from "./Slices/UploadProductSlice";
import AllUsers from "./Slices/AllUsers";
import Get_Category from './Slices/CategorySlice';
import CartSlice from "./Slices/CartSlice";
import ReviewsSlice from "./Slices/ReviewsSlice";
import WhiteListSlice from "./Slices/WhiteListSlice";
import IssessSlice from "./Slices/IssessSlice";
import FeaturesSlice from './Slices/FeaturesSlice';
import BrandSlice from './Slices/BrandSlice';
import { Brand_Query } from './Actions/BrandApi';
export const Store = configureStore({
    reducer: {
        products: ProductsSlice,
        auth: UserSlice,
        Upload_Product: UploadProductSlice,
        allusers: AllUsers,
        Banners: Get_BannersSlice,
        Category: Get_Category,
        Brand: BrandSlice,
        Cart: CartSlice,
        Review: ReviewsSlice,
        WhiteList: WhiteListSlice,
        Issess: IssessSlice,
        Features: FeaturesSlice,
        [Brand_Query.reducerPath]: Brand_Query.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Brand_Query.middleware)
});
export default Store

