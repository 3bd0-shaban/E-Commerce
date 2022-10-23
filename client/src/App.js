import React, { useEffect } from 'react'
import { Home, Signup, Signin, ProductScreen, Dashboard, AddProduct,AllProducts,Profile,Charts,getError } from './Exports';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { UserAction } from './Redux/Slices/UserSlice';
import axios from 'axios'
axios.defaults.withCredentials = true;
function App() {
  const dispatch = useDispatch();
  // const {isLogged}=useSelector((state)=>state.auth);
  useEffect(() => {
      const FetchData = async () => {
          try {
              const result = await axios.get('http://localhost:5000/api/auth/info');
              dispatch(UserAction.GetUserInfo(result.data));
          } catch (error) {
              dispatch(UserAction.Failed_Fetch(getError(error)));
          }
      };
      FetchData();
  }, [dispatch]);
  // if(isLogged){
    
  // }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/product/:id' element={<ProductScreen />} />
          <Route path='/dashboard/all_users' element={<Dashboard />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/dashboard/all_products' element={<AllProducts />}/>
          <Route path='/dashboard/charts' element={<Charts />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
