import React, { useEffect } from 'react'
import {
  Home, Signup, Signin, ProductScreen, AllUsers, AddProduct, AllProducts, AddFeatures,
  Mainprofile, Charts, Calender, Orders, Chat, Issues, Cart, WhiteList, Dashboard
} from './Components/Exports';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { Fetch_Logged_User } from './Redux/APIs/AuthAction';
axios.defaults.withCredentials = true;
function App() {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isLogged) {
      dispatch(Fetch_Logged_User())
    }
  }, [dispatch, isLogged]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/product/:id' element={<ProductScreen />} />
          <Route path='/dashboard/all_users' element={<AllUsers />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Mainprofile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/whitelist' element={<WhiteList />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/addproduct' element={<AddProduct />} />
          <Route path='/dashboard/addfeatures' element={<AddFeatures />} />
          <Route path='/dashboard/all_products' element={<AllProducts />} />
          <Route path='/dashboard/stats' element={<Charts />} />
          <Route path='/dashboard/calender' element={<Calender />} />
          <Route path='/dashboard/Orders' element={<Orders />} />
          <Route path='/dashboard/messages' element={<Chat />} />
          <Route path='/dashboard/issues' element={<Issues />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
