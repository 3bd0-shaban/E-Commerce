import ProductsSlice from "./Slices/ProductSlice";
import UserSlice from "./Slices/UserSlice";
import UploadProductSlice from "./Slices/UploadProductSlice";
import { configureStore } from '@reduxjs/toolkit'
import AllUsers from "./Slices/AllUsers";

export const Store = configureStore({
    reducer: {
        products: ProductsSlice,
        auth: UserSlice,
        Upload_Product: UploadProductSlice,
        allusers: AllUsers
    },

});

// export const persistor = persistStore(Store)
export default Store

