import { configureStore } from '@reduxjs/toolkit'
import UserSlice from "./Slices/UserSlice";
import FeaturesSlice from './Slices/FeaturesSlice';
import { apiSlice } from './APIs/ApiSlice';
export const Store = configureStore({
    reducer: {
        auth: UserSlice,
        Features: FeaturesSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});
export default Store

