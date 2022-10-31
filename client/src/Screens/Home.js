import React,{useEffect} from 'react'
import { HomeProducts, Header,Banners } from '../Exports'
// import { useSelector } from 'react-redux';
// import { UserAction } from './../Redux/Slices/UserSlice';
// import getError from './../utile';


const Home = () => {
    function getcookie(cookiename){
        var cookiestring  = document.cookie;
        var cookiearray = cookiestring.split(';');
        for(var i =0 ; i < cookiearray.length ; ++i){ 
            if(cookiearray[i].trim().match('^'+cookiename+'=')){ 
                return cookiearray[i].replace(`${cookiename}=`,'').trim();
            }
        } return null;
        }
    useEffect(() => {
        const CheckAuthorization = async () => {
            const cookie = getcookie('token');
            if (cookie) {
                console.log(cookie)
                console.log('xcvbnm')
                // localStorage.removeItem('Logged?')
            }
        }
        CheckAuthorization();
    }, [])
    // const { success, user, isAdmin, isLogged } = useSelector((state) => state.auth)
    return (
        <div>
            <Header />
            <Banners />
            <HomeProducts />
        </div>
    )
}

export default Home
