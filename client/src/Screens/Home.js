import React, { useEffect } from 'react'
import { HomeProducts, Header } from '../Exports'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { UserAction } from './../Redux/Slices/UserSlice';
import getError from './../utile';
const Home = () => {// eslint-disable-next-line
    const { isLogged, user, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     if (isLogged) {
    //         const getToken = async () => {
    //             const res = await axios.get('http://localhost:5000/api/auth/verifytoken')
    //             // console.log(res);
    //             dispatch(UserAction.LoggedIn(res.data));
    //         }
    //         getToken();
    //     }
    // }, [dispatch, isLogged])
    return (
        <div>
            <Header />
            {isLogged && <p className='text-3xl font-mono font-extrabold'>{user.email}</p>}
            {isLogged && <p className='text-3xl font-mono font-extrabold'>Helllooooooooooooooooooooo</p>}
            {error && dispatch(UserAction.Failed_LogIn(getError(error)))}
            <HomeProducts />
        </div>
    )
}

export default Home
