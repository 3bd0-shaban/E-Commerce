import React from 'react'
import {
  Home, Signup, Signin, ProductScreen, AllUsers, AddProduct, AllProducts, AddFeatures,
  Mainprofile, Charts, Calender, Orders, Chat, Issues, Cart, WhiteList, Dashboard, RequireAuth, Layout, NotFounded, RequiredAdmin
} from './Components/Exports';
import { Route, Routes } from 'react-router-dom'
import { useGetUserQuery } from './Redux/APIs/AuthApi';
import PersistLogin from './Components/PersistLogin';
function App() {
  const { data } = useGetUserQuery(undefined) || {};
  console.log(data)
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route index element={<Home />} />
          <Route path='product/:id' element={<ProductScreen />} />
          <Route path='signin' element={<Signin />} />
          <Route path='signup' element={<Signup />} />
          <Route path='notfound' element={<NotFounded />} />
          <Route element={<RequireAuth />}>
            <Route path='cart' element={<Cart />} />
            <Route path='profile' element={<Mainprofile />} />
            <Route path='whitelist' element={<WhiteList />} />
          </Route>
          <Route element={<RequiredAdmin />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='dashboard/all_users' element={<AllUsers />} />
            <Route path='dashboard/addproduct' element={<AddProduct />} />
            <Route path='dashboard/addfeatures' element={<AddFeatures />} />
            <Route path='dashboard/all_products' element={<AllProducts />} />
            <Route path='dashboard/stats' element={<Charts />} />
            <Route path='dashboard/calender' element={<Calender />} />
            <Route path='dashboard/Orders' element={<Orders />} />
            <Route path='dashboard/messages' element={<Chat />} />
            <Route path='dashboard/issues' element={<Issues />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
