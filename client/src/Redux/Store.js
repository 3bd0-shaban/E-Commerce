import ProductsSlice from "./Slices/ProductSlice";
import UserSlice from "./Slices/UserSlice";
import UploadProductSlice from "./Slices/UploadProductSlice";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AllUsers from "./Slices/AllUsers";
const persistConfig = {
    key: 'root',
    storage,
}

const UserSlicePersist = persistReducer(persistConfig, UserSlice)

export const Store = configureStore({
    reducer: {
        products: ProductsSlice,
        auth: UserSlicePersist,
        Upload_Product: UploadProductSlice,
        allusers: AllUsers
    },
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),

});

export const persistor = persistStore(Store)
export default Store

