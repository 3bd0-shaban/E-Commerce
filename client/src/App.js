import React from 'react'
import {
  Home, Signup, Signin, ProductScreen, AllUsers, AddProduct, AllProducts, AddFeatures, EmailVerify, SetAddress, ForgetPassword, ResetPassword,
  Mainprofile, Charts, Calender, Orders, Chat, Issues, Cart, WhiteList, Dashboard, RequireAuth, Layout, NotFounded, PersistLogin, Search
} from './Components/Exports';
import { Route, Routes } from 'react-router-dom'
import { ROLES } from './Config/Roles';
function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path='/' element={<Layout />}>
          <Route path='signin' element={<Signin />} />
          <Route path='signup' element={<Signup />} />
          <Route path='verify' element={<EmailVerify />} />
          <Route path='forgetpassword' element={<ForgetPassword />} />
          <Route path='resetpassword' element={<ResetPassword />} />
          <Route path='product/:id' element={<ProductScreen />} />
          <Route path='search?keyword=:keyword' element={<Search />} />
          <Route path='notfound' element={<NotFounded />} />
          <Route index element={<Home />} />
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Customer]} />}>
              <Route path='cart' element={<Cart />} />
              <Route path='address' element={<SetAddress />} />
              <Route path='profile' element={<Mainprofile />} />
              <Route path='whitelist' element={<WhiteList />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
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
      </Route>
    </Routes>
  );
}

export default App;
