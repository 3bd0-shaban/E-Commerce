// import React, { useEffect, useState,useRef } from 'react'
import { HomeProducts, Header } from '../Exports'
import { useSelector, useDispatch } from 'react-redux';
// import { UserAction } from './../Redux/Slices/UserSlice';
// import getError from './../utile';
import axios from 'axios';
import { useEffect } from 'react';
import { UserAction } from '../Redux/Slices/UserSlice';
axios.defaults.withCredentials = true;

const Home = () => {// eslint-disable-next-line
    // const dispatch =useDispatch();
    // useEffect(() => {
    //     const sednRequest = async (token) => {
    //         const res = await axios.get("http://localhost:5000/api/auth/verifytoken", { withCredentials: true, },{ headers:{Authorization:token}})
    //             .catch((err) => console.log(err));
    //         const data = await res.data;
    //         // return data;
    //         dispatch(UserAction.LoggedIn(data.user))
    //     };
    //     sednRequest()
    // }, [dispatch])

    return (
        <div>
            <Header />
            {/* {user && <p className='text-3xl font-mono font-extrabold'>{user.email}</p>} */}
            {/* {isLogged && <p className='text-3xl font-mono font-extrabold'>Helllooooooooooooooooooooo</p>} */}
            {/* {error && dispatch(UserAction.Failed_LogIn(getError(error)))} */}
            <HomeProducts />
        </div>
    )
}

export default Home
