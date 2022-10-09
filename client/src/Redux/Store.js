import ProductsSlice from "./Slices/ProductSlice";
import UserSlice from "./Slices/UserSlice";
import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit'
import {persistReducer, persistStore, FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import GetUserProfileSlice from "./Slices/GetUserProfileSlice";
import AllUsers from "./Slices/AllUsers";
const persistConfig = {
    key: 'root',
    storage,
}

const UserSlicePersist = persistReducer(persistConfig, UserSlice)
// const GetUserProfileSlicePersist = persistReducer(persistConfig, GetUserProfileSlice)

export const Store = configureStore({
    reducer: {
        products: ProductsSlice,
        auth: UserSlicePersist,
        // user: GetUserProfileSlicePersist,
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

