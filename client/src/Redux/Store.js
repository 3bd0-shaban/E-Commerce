import ProductsSlice from "./Slices/ProductSlice";
import UserSlice from "./Slices/UserSlice";
import Get_BannersSlice from "./Slices/BannersSlice";
import UploadProductSlice from "./Slices/UploadProductSlice";
import { configureStore } from '@reduxjs/toolkit'
import AllUsers from "./Slices/AllUsers";
import Get_Category from './Slices/CategorySlice';
import CartSlice from "./Slices/CartSlice";
export const Store = configureStore({
    reducer: {
        products: ProductsSlice,
        auth: UserSlice,
        Upload_Product: UploadProductSlice,
        allusers: AllUsers,
        Banners: Get_BannersSlice,
        Category: Get_Category,
        Cart :CartSlice
    },

});

// export const persistor = persistStore(Store)
export default Store

