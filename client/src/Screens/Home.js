import React, { useEffect } from 'react'
import { HomeProducts, Header } from '../Exports'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { TokenAction } from './../Redux/Slices/TokenSlice';
const Home = () => {
    const token = useSelector((state) => state.token);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const isLogged = localStorage.getItem('Loggedin ?');
        if (isLogged) {
            const getToken = async () => {
                const res = await axios.post('http://localhost:5000/api/auth/refresh_token', null)
                console.log(res);
                dispatch(TokenAction.AccessToken(res.data.refresh_Token))
            }
            getToken();
        }
    }, [token, user, dispatch])
    return (
        <div>
            <Header />
            <HomeProducts />
        </div>
    )
}

export default Home
