// import React, { useEffect, useState,useRef } from 'react'
import { HomeProducts, Header } from '../Exports'
import { useSelector, useDispatch } from 'react-redux';
// import { UserAction } from './../Redux/Slices/UserSlice';
// import getError from './../utile';


const Home = () => {
    const { success, user, isAdmin,isLogged } = useSelector((state) => state.auth)
    return (
        <div>
            <Header />
            {isLogged &&
                <>
                    <img src={user[0].avatar} alt='' className='h-10 w-10'></img>
                    <p className='text-3xl font-mono font-extrabold'>{user[0]._id}</p>
                    <p className='text-3xl font-mono font-extrabold'>{user[0].username}</p>
                    <p className='text-3xl font-mono font-extrabold'>{user[0].password}</p>
                    <p className='text-3xl font-mono font-extrabold'>{user[0].email}</p>
                    <p className='text-3xl font-mono font-extrabold'>{user[0].isAdmin}</p>
                    <p className='text-3xl font-mono font-extrabold'>{user[0].createdAt}</p>
                </>
            }
            {isAdmin && <p className='text-3xl font-mono font-extrabold'>Hi Admin</p>}
            {/* {isLogged && <p className='text-3xl font-mono font-extrabold'>Helllooooooooooooooooooooo</p>} */}
            {/* {error && dispatch(UserAction.Failed_LogIn(getError(error)))} */}
            {success && <p className='text-3xl font-mono font-extrabold'>{success}</p>}
            <HomeProducts />
        </div>
    )
}

export default Home
