import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { IoSettingsOutline } from 'react-icons/io5'
import { TbMessageReport } from 'react-icons/tb'
import { CgChevronDown } from 'react-icons/cg'
import { GiShoppingCart } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'
import { MdShoppingBag } from 'react-icons/md'
import { BsSave2, BsWhatsapp, BsSearch } from 'react-icons/bs'
import { SecNavbar } from '../Exports';
const Header = () => {
  const { user, isLogged } = useSelector((state) => state.auth);


  const Rightnav = () => {
    return (
      <div className='flex gap-3 justify-end ml-auto xl:ml-0'>
        <div className='items-center text-white hidden md:flex'>
          <BsWhatsapp style={{ 'fontSize': '2.5rem', 'backgroundColor': '#FDBA74', 'borderRadius': '50%', 'color': '#fff' }} />
          <div className='ml-3'>
            <p className='font-medium'>Call Us Now</p>
            <p>+205482148</p>
          </div>
        </div>
        <Link to='/cart' className="inline-flex relative items-center px-3 text-sm font-medium text-center  text-white hover:text-[#FDBA74] rounded-lg  focus:outline-none">
          <div className='text-3xl'>
            <MdShoppingBag />
          </div>
          <span className="sr-only">Notifications</span>
          <div className="inline-flex absolute top-0 left-9 justify-center items-center w-4 h-4 text-[8px] font-bold text-white bg-red-500 rounded-full">20</div>
          <div className='ml-3 text-start'>
            <p className='font-medium'>Shopinng cart</p>
            <div className='flex gap-3'>
              <p>2 items</p>
              <p>1545 total</p>
            </div>
          </div>
        </Link>
        <div className='relative dropdown'>
          <div className='flex gap-8 hover:text-[#511c97]'>
            <button className=" flex text-sm rounded-full border-2 border-white  ">
              <img className="p-1 w-10 h-10 rounded-full focus:ring-2 focus:ring-gray-300 " src={isLogged ? user.avatar : 'https://res.cloudinary.com/abdo9/image/upload/v1664894521/samples/ecommerce/istockphoto-1300845620-612x612_rpokfs.jpg'} alt="" />
              <p className='font-mono font-extrabold text-white my-auto text-xl'>{user.username} </p>
              <div className='font-mono font-extrabold text-white my-auto text-xl'>
                {isLogged && <CgChevronDown />}
              </div>
            </button>
          </div>
          <div className='absolute dropdwon-content hidden w-64 shadow-lg right-0 text-end bg-white z-20'>
            <div>
              <Link to='/' className='flex gap-2 py-3 px-4 hover:bg-gray-100 pt-3' ><CgProfile style={{ 'marginTop': '3px', 'fontSize': '1.3rem' }} />Profile</Link>
              <Link to='/' className='flex gap-2 py-3 px-4 hover:bg-gray-100' ><BsSave2 style={{ 'marginTop': '3px', 'fontSize': '1.3rem' }} />Favourite</Link>
              <Link to='/' className='flex gap-2 py-3 px-4 hover:bg-gray-100' ><IoSettingsOutline style={{ 'marginTop': '3px', 'fontSize': '1.3rem' }} />Orders</Link>
              <Link to='/' className='flex gap-2 py-3 px-4 hover:bg-gray-100' ><TbMessageReport style={{ 'marginTop': '3px', 'fontSize': '1.3rem' }} />Report a problem</Link>
            </div>
            <div className="py-1 hover:bg-gray-100 pb-3">
              <Link to="/signin" className="text-gray-700 px-4 py-2 text-base font-poppins flex gap-3 mt-1 ">Sign In</Link>
              <Link to="/signup" className="text-gray-700 px-4 py-2 text-base font-poppins flex gap-3 mt-1 ">Log Out</Link>
            </div>
          </div>
        </div>
        {/* <Link to='/addproduct' className='hidden md:block px-4 pt-3.5 md:pt-[.7rem] text-xs md:text-base bg-white font-[100] text-[#511c97] font-Permanent rounded-full hover:bg-[#FDBA74] hover:text-white focus:ring-2 focus:ring-[#511c97]'>Create Product</Link> */}
      </div>
    )
  }

  const LeftSide = () => {
    return (
      <div className='flex gap-7 items-center'>
        <div className='flex gap-3'>
          <div className=" text-white  text-2xl p-1 bg-orange-300 rounded-full flex items-center">
            <GiShoppingCart />
          </div>
          <Link to='/' className='font-bold font-serif text-xl md:text-3xl text-white'>Market</Link>
        </div>
      </div>
    )
  }
  const Search = () => {
    return (
      <form className='w-[52%] ml-auto hidden xl:block'>
        <label className='mb-2 text-sm font-medium text-gray-900 sr-only'>Search</label>
        <div className='relative mx-auto w-3/4'>
          <input className='outline-none rounded-3xl pb-3 pt-2 bg-gray-100 w-full mx-auto px-3 placeholder:text-sm' type='search' placeholder='Search for laptops or hardwares ....' />
          <div className='absolute items-center flex inset-y-0 pr-3 right-0'><BsSearch /></div>
        </div>
      </form>
    )
  }
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-55px";
    }
    prevScrollpos = currentScrollPos;
  }
  return (
    <>
      <div className='pb-28' >
        <div className='py-3 mb-4 bg-gradient-to-l from-[#511c97] via-[#5c47cf] to-[#5E50AD] fixed z-20 w-screen top-0 block transition-all' id='navbar'>
          <div className='container max-w-8xl flex items-center px-1 md:px-3'>
            <LeftSide />
            <Search />
            <Rightnav />
          </div>
          <SecNavbar />
        </div>
      </div>

    </>
  )
}
export default Header