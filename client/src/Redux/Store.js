import ProductsSlice  from "./Slices/ProductSlice";
import UserSlice  from "./Slices/UserSlice";
import {configureStore} from '@reduxjs/toolkit'
import TokenSlice from "./Slices/TokenSlice";
const Store = configureStore({  
    reducer: {
        products: ProductsSlice,
        user:UserSlice,
        token:TokenSlice
    }});

export default Store

