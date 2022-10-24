import React, { useEffect } from 'react'
import { HomeProducts, Header } from '../Exports'
import { useSelector } from 'react-redux';
// import { UserAction } from './../Redux/Slices/UserSlice';
// import getError from './../utile';


const Home = () => {
    // function getCookie(cname) {
    //     let name = cname + "=";
    //     let decodedCookie = decodeURIComponent(document.cookie);
    //     let ca = decodedCookie.split(';');
    //     for (let i = 0; i < ca.length; i++) {
    //         let c = ca[i];
    //         while (c.charAt(0) === ' ') {
    //             c = c.substring(1);
    //         }
    //         if (c.indexOf(name) === 0) {
    //             return c.substring(name.length, c.length);
    //         }
    //     }
    //     return "";
    // }
    // useEffect(() => {
    //     const CheckAuthorization = async () => {
    //         const cookie = getCookie('token');
    //         if (cookie === "") {
    //             console.log(cookie)
    //             console.log('xcvbnm')
    //             localStorage.removeItem('Logged?')
    //         }
    //     }
    //     CheckAuthorization();
    // }, [])
    const { success, user, isAdmin, isLogged } = useSelector((state) => state.auth)
    return (
        <div>
            <Header />
            {isLogged &&
                <>
                    <img src={user.avatar} alt='' className='h-10 w-10'></img>
                    <p className='text-3xl font-mono font-extrabold'>{user._id}</p>
                    <p className='text-3xl font-mono font-extrabold'>{user.username}</p>
                    <p className='text-3xl font-mono font-extrabold'>{user.password}</p>
                    <p className='text-3xl font-mono font-extrabold'>{user.email}</p>
                    <p className='text-3xl font-mono font-extrabold'>{user.isAdmin}</p>
                    <p className='text-3xl font-mono font-extrabold'>{user.createdAt}</p>
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
