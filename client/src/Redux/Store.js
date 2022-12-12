import { configureStore } from '@reduxjs/toolkit'
import UserSlice from "./Slices/UserSlice";
import AllUsers from "./Slices/AllUsers";
import FeaturesSlice from './Slices/FeaturesSlice';
import { Brand_Query } from './APIs/BrandApi';
import { Category_Query } from './APIs/CategoryApi';
import { Banner_Query } from './APIs/BannerApi';
import { Issess_Query } from './APIs/IssessApi';
import { Products_Query } from './APIs/ProductsApi';
import { Reviews_Query } from './APIs/ReviewsApi';
import { Whitelist_Query } from './APIs/WhiteListApi';
import { Cart_Query } from './APIs/CartApi';
import { Order_Query } from './APIs/OrderApi';
export const Store = configureStore({
    reducer: {
        auth: UserSlice,
        allusers: AllUsers,
        Features: FeaturesSlice,
        [Brand_Query.reducerPath]: Brand_Query.reducer,
        [Category_Query.reducerPath]: Category_Query.reducer,
        [Banner_Query.reducerPath]: Banner_Query.reducer,
        [Issess_Query.reducerPath]: Issess_Query.reducer,
        [Products_Query.reducerPath]: Products_Query.reducer,
        [Reviews_Query.reducerPath]: Reviews_Query.reducer,
        [Whitelist_Query.reducerPath]: Whitelist_Query.reducer,
        [Cart_Query.reducerPath]: Cart_Query.reducer,
        [Order_Query.reducerPath]: Order_Query.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        Brand_Query.middleware,
        Category_Query.middleware,
        Banner_Query.middleware,
        Issess_Query.middleware,
        Products_Query.middleware,
        Reviews_Query.middleware,
        Whitelist_Query.middleware,
        Cart_Query.middleware,
        Order_Query.middleware)
});
export default Store

