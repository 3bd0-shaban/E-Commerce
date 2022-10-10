import React, { useEffect, useState, useRef } from 'react'
import { Home, Signup, Signin, ProductScreen, Dashboard, AddProduct } from './Exports';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux';
axios.defaults.withCredentials = true;
function App() {
  const { isLogged } = useSelector((state => state.auth))
  let firstRender = useRef(true);
  const [user, setUser] = useState();

  try {
    const refreshToken = async () => {
      if (isLogged) {
        const res = await axios.get("http://localhost:5000/api/auth/refresh_token", { withCredentials: true, })
          .catch((err) => console.log(err));
        const data = await res.data;
        return data;
      }

    };
    const sednRequest = async () => {
      if (isLogged) {
        const res = await axios.get("http://localhost:5000/api/auth/verifytoken", { withCredentials: true, })
          .catch((err) => console.log(err));
        const data = await res.data;
        return data;
      }
    };
    useEffect(() => {
      if (isLogged) {
        if (firstRender) {
          firstRender.current = false;
          sednRequest().then((data) => setUser(data.user));
        }
        let interval = setInterval(() => {
          refreshToken().then((data) => setUser(data.user));
        }, 1000 * 3);
        return () => clearInterval(interval);
      }
    }, []);
  } catch (error) {
    console.log(error)
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/product/:id' element={<ProductScreen />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/addproduct' element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
