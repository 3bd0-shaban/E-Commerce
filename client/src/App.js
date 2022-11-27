import React, { useEffect } from 'react'
import {
  HomeProducts, Signup, Signin, ProductScreen, AllUsers, AddProduct, AllProducts, AddFeatures,
  Mainprofile, Charts, Calender, getError, Orders, Chat, Issues, Cart, WhiteList
} from './Components/Exports';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { UserAction } from './Redux/Slices/UserSlice';
import axios from 'axios'
axios.defaults.withCredentials = true;
function App() {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isLogged) {
      const FetchData = async () => {
        try {
          const result = await axios.get('http://localhost:5000/api/auth/info');
          // if(status == 400 || status == 50){
          //   localStorage.removeItem('token')
          // }
          dispatch(UserAction.GetUserInfo(result.data));
          if (result.data.isAdmin === true) {
            localStorage.setItem('isAdmin?', true);
          }
        } catch (error) {
          dispatch(UserAction.Failed_Fetch(getError(error)));
        }
      };
      FetchData();
    }
  }, [dispatch, isLogged]);
  // 

  // }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<HomeProducts />} />
          <Route path='/product/:id' element={<ProductScreen />} />
          <Route path='/dashboard/all_users' element={<AllUsers />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Mainprofile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/whitelist' element={<WhiteList />} />
          <Route path='/dashboard/addproduct' element={<AddProduct />} />
          <Route path='/dashboard/addfeatures' element={<AddFeatures />} />
          <Route path='/dashboard/all_products' element={<AllProducts />} />
          <Route path='/dashboard/stats' element={<Charts />} />
          <Route path='/dashboard/calender' element={<Calender />} />
          {/* <Route path='/dashboard/addbanner' element={<Addbanner />} /> */}
          <Route path='/dashboard/Orders' element={<Orders />} />
          <Route path='/dashboard/messages' element={<Chat />} />
          <Route path='/dashboard/issues' element={<Issues />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
