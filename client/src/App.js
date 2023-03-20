import React from 'react'
import {
  Home, Signup, Signin, ProductScreen, EmailVerify, SetAddress, ForgetPassword, ResetPassword,
  Mainprofile, Cart, WhiteList, Dashboard, RequireAuth, Layout, NotFounded, PersistLogin, Search
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
          <Route path='search' element={<Search />} />
          <Route path='product' element={<Search />} />
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
              <Route path='dashboard/:dash' element={<Dashboard />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
