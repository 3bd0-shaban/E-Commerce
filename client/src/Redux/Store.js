import { configureStore } from '@reduxjs/toolkit'
import UserSlice from "./Slices/UserSlice";
import FeaturesSlice from './Slices/FeaturesSlice';
import { BrandApi } from './APIs/BrandApi';
import { CategoryApi } from './APIs/CategoryApi';
import { BannerApi } from './APIs/BannerApi';
import { IssessApi } from './APIs/IssessApi';
import { ProductApi } from './APIs/ProductsApi';
import { ReviewApi } from './APIs/ReviewsApi';
import { WhitelistApi } from './APIs/WhiteListApi';
import { CartApi } from './APIs/CartApi';
import { OrderApi } from './APIs/OrderApi';
// import { AuthApi } from './APIs/AuthApi';
import { apiSlice } from './APIs/ApiSlice';
export const Store = configureStore({
    reducer: {
        auth: UserSlice,
        Features: FeaturesSlice,
        [BrandApi.reducerPath]: BrandApi.reducer,
        [CategoryApi.reducerPath]: CategoryApi.reducer,
        [BannerApi.reducerPath]: BannerApi.reducer,
        [IssessApi.reducerPath]: IssessApi.reducer,
        [ProductApi.reducerPath]: ProductApi.reducer,
        [ReviewApi.reducerPath]: ReviewApi.reducer,
        [WhitelistApi.reducerPath]: WhitelistApi.reducer,
        [CartApi.reducerPath]: CartApi.reducer,
        [OrderApi.reducerPath]: OrderApi.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        BrandApi.middleware,
        CategoryApi.middleware,
        BannerApi.middleware,
        IssessApi.middleware,
        ProductApi.middleware,
        ReviewApi.middleware,
        WhitelistApi.middleware,
        CartApi.middleware,
        apiSlice.middleware,
        OrderApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});
export default Store

