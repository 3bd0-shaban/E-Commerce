import ProductsSlice  from "./Slices/ProductSlice";
import UserSlice  from "./Slices/UserSlice";
import {configureStore} from '@reduxjs/toolkit'
import TokenSlice from "./Slices/TokenSlice";
import AllUsers from "./Slices/AllUsers";
const Store = configureStore({  
    reducer: {
        products: ProductsSlice,
        user:UserSlice,
        token:TokenSlice,
        allusers:AllUsers
    }});

export default Store

