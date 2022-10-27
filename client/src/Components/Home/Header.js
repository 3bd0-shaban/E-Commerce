import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { UserAction } from './../../Redux/Slices/UserSlice';
import { IoSettingsOutline } from 'react-icons/io5'
import { TbMessageReport } from 'react-icons/tb'
import { CgProfile } from 'react-icons/cg'
import { BsSave2, BsWhatsapp } from 'react-icons/bs'
const Header = () => {
  const navigate = useNavigate();
  const { user, isLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handlelogout = (event) => {
    dispatch(UserAction.LogOut());
    // dispach(GetUserProfileAction.LogoutUser());
    navigate('/signin')
  }
  return (
    <div className=' bg-gray-50 py-3 border-b'>
      <div className='container max-w-8xl flex justify-between items-center px-1 md:px-3'>
        <div className='flex'>
          <div className='bg-orange-300 rounded-full mr-2 px-2 flex items-center'>
            <i className="fa fa-cart-arrow-down text-white  text-xl"></i>
          </div>
          <Link to='/' className='font-bold font-serif text-xl md:text-3xl'>Market</Link>
        </div>
        <div className='hidden lg:block'>

          <form>
            <div className="flex px-10">
              <label htmlFor="location-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
              <div className="relative w-full">
                <input type="search" id="location-search&quot;" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for city or address" required="" />
                <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                  <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>

        </div>

        <div className='flex gap-3'>
          <div className='flex items-center'>
            <BsWhatsapp style={{ 'fontSize': '2.5rem', 'backgroundColor': '#FDBA74', 'borderRadius': '50%', 'color': '#fff' }} />
            <div className='ml-3'>
              <p className='font-medium'>Call Us Now</p>
              <p>+205482148</p>
            </div>
          </div>
          <Link type="button" className="inline-flex relative items-center px-3 text-sm font-medium text-center  text-white rounded-lg  focus:outline-none">
            <i className="fa fa-cart-arrow-down text-black text-xl"></i>
            <span className="sr-only">Notifications</span>
            <div className="inline-flex absolute -top-1 -right-1 justify-center items-center w-5 h-5 text-[8px] font-bold text-white bg-red-500 rounded-full border-2 border-white">20</div>
          </Link>
          <div className='relative dropdown'>
            <button className=" flex text-sm rounded-full md:mr-0">
              <img className="p-1 w-10 h-10 rounded-full focus:ring-2 focus:ring-gray-300" src={user.avatar} alt="" />
            </button>
            <div className='absolute dropdwon-content hidden w-64 shadow-lg right-0 text-end bg-white z-10'>
              <div>
                <Link to='/' className='flex gap-2 py-3 px-4 hover:bg-gray-100 pt-3' ><CgProfile style={{ 'marginTop': '3px', 'fontSize': '1.3rem' }} />Profile</Link>
                <Link to='/' className='flex gap-2 py-3 px-4 hover:bg-gray-100' ><BsSave2 style={{ 'marginTop': '3px', 'fontSize': '1.3rem' }} />Favourite</Link>
                <Link to='/' className='flex gap-2 py-3 px-4 hover:bg-gray-100' ><IoSettingsOutline style={{ 'marginTop': '3px', 'fontSize': '1.3rem' }} />Orders</Link>
                <Link to='/' className='flex gap-2 py-3 px-4 hover:bg-gray-100' ><TbMessageReport style={{ 'marginTop': '3px', 'fontSize': '1.3rem' }} />Report a problem</Link>
              </div>
              <div className="py-1 hover:bg-gray-100 pb-3">
                <Link to="/signup" className="text-gray-700 px-4 py-2 text-base font-poppins flex gap-3 mt-1 ">Log Out</Link>
              </div>
            </div>
          </div>
          {/* {isLogged ?
            <>
              <button type='submit' onClick={handlelogout} className='border text-center px-3 font-medium font-serif rounded-lg py-2 hover:bg-gray-200 focus:ring focus:ring-gray-200'>Log Out</button>
              <Link to='/profile' className='border text-center px-3 font-medium font-serif rounded-lg py-2 hover:bg-gray-200 focus:ring focus:ring-gray-200'>profile</Link>
              <Link to='/dashboard/all_users' className='border text-center px-3 font-medium font-serif rounded-lg py-2 hover:bg-gray-200 focus:ring focus:ring-gray-200'>Dashboard</Link>
              <Link to='/addproduct' className='border text-center px-3 font-medium font-serif rounded-lg py-2 hover:bg-gray-200 focus:ring focus:ring-gray-200'>AddProduct</Link>

              <p>{user.id}</p>
            </>
            :
            <>
              <Link to='/signin' className='border text-center px-3 font-medium font-serif rounded-lg py-2 hover:bg-gray-200 focus:ring focus:ring-gray-200'>Sign In</Link>
              <Link to='/signup' className='border text-center px-3 font-medium font-serif rounded-lg py-2 hover:bg-gray-200 focus:ring focus:ring-gray-200'>Sign Up</Link>
              <Link to='/dashboard/all_users' className='border text-center px-3 font-medium font-serif rounded-lg py-2 hover:bg-gray-200 focus:ring focus:ring-gray-200'>Dashboard</Link>
            </>
          } */}
        </div>
      </div>
    </div>
  )
}

export default Header
