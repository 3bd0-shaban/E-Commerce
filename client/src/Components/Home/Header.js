import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { IoSettingsOutline } from 'react-icons/io5'
import { TbMessageReport } from 'react-icons/tb'
import { CgChevronDown } from 'react-icons/cg'
import { CgProfile } from 'react-icons/cg'
import { MdShoppingBag } from 'react-icons/md'
import { BsSave2, BsWhatsapp, BsSearch } from 'react-icons/bs'
const Header = (props) => {
  // const navigate = useNavigate();
  const { user, isLogged } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();


  const Rightnav = () => {
    return (
      <div className='flex gap-3 ml-auto'>
        <div className='items-center text-white hidden md:flex'>
          <BsWhatsapp style={{ 'fontSize': '2.5rem', 'backgroundColor': '#FDBA74', 'borderRadius': '50%', 'color': '#fff' }} />
          <div className='ml-3'>
            <p className='font-medium'>Call Us Now</p>
            <p>+205482148</p>
          </div>
        </div>
        <Link type="button" className="inline-flex relative items-center px-3 text-sm font-medium text-center  text-white rounded-lg  focus:outline-none">
          <div className='text-3xl'>
            <MdShoppingBag />
          </div>
          <span className="sr-only">Notifications</span>
          <div className="inline-flex absolute top-0 right-0 justify-center items-center w-4 h-4 text-[8px] font-bold text-white bg-red-500 rounded-full">20</div>
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
        <Link to='/addproduct' className='hidden md:block px-4 pt-3.5 md:pt-[.7rem] text-xs md:text-base bg-white font-[100] text-[#511c97] font-Permanent rounded-full hover:bg-[#FDBA74] hover:text-white focus:ring-2 focus:ring-[#511c97]'>Create Product</Link>
      </div>
    )
  }
  // eslint-disable-next-line
  const Categorybar = () => {
    return (
      <div className='py-3 mb-4 shadow bg-gradient-to-l mt-[4.2rem] from-[#511c97] via-[#5c47cf] to-[#5E50AD] fixed z-10 w-screen '>
        <div className='flex gap-4 justify-center'>
          <Link className='font-serif text-3xl text-white'>Cateories</Link>
          <Link className='font-serif text-3xl text-white'>Cateories</Link>
          <Link className='font-serif text-3xl text-white'>Cateories</Link>
          <Link className='font-serif text-3xl text-white'>Cateories</Link>
          <Link className='font-serif text-3xl text-white'>Cateories</Link>
        </div>
      </div>
    )
  }



  return (
    <>
      <div className='pb-28'>
        <div className='py-3 mb-4 bg-gradient-to-l from-[#511c97] via-[#5c47cf] to-[#5E50AD] fixed z-20 w-screen'>
          <div className='container max-w-8xl flex items-center px-1 md:px-3'>

            <div className='flex gap-7 items-center'>
              <div className='flex'>
                <div className='bg-orange-300 rounded-full mr-2 px-2 flex items-center'>
                  <i className="fa fa-cart-arrow-down text-white  text-2xl"></i>
                </div>
                <Link to='/' className='font-bold font-serif text-xl md:text-3xl text-white'>Market</Link>
              </div>
              <div className='hidden md:block'>
                <ul className='flex gap-5 text-white font-medium  font-mono text-lg'>
                  <Link className='border-b-2 border-b-transparent hover:border-b-2 hover:border-b-white transition ease-in-out duration-300' to='/'>Home</Link>
                  <Link className='border-b-2 border-b-transparent hover:border-b-2 hover:border-b-white transition ease-in-out duration-300' to='/dashboard/all_users'>Dashboard</Link>
                  <Link className='border-b-2 border-b-transparent hover:border-b-2 hover:border-b-white transition ease-in-out duration-300'>Servic</Link>
                  <Link className='border-b-2 border-b-transparent hover:border-b-2 hover:border-b-white transition ease-in-out duration-300'>Cantact Us</Link>
                  <Link className='border-b-2 border-b-transparent hover:border-b-2 hover:border-b-white transition ease-in-out duration-300'>Home</Link>
                </ul>
              </div>
            </div>

            <form className='w-[25%] mx-auto hidden lg:block'>
              <label className='mb-2 text-sm font-medium text-gray-900 sr-only'>Search</label>
              <div className='relative mx-auto w-full'>
                <input className='outline-none rounded-3xl pb-3 pt-2 bg-gray-100 w-full mx-auto px-3 placeholder:text-sm' type='search' placeholder='Search for laptops or hardwares ....' />
                <div className='absolute items-center flex inset-y-0 pr-3 right-0'><BsSearch /></div>
              </div>
            </form>

            <Rightnav />
          </div>
        </div>
        <div className='py-3 mb-4 shadow bg-gradient-to-l mt-[4.2rem] from-[#511c97] via-[#5c47cf] to-[#5E50AD] fixed z-10 w-screen lg:hidden'>
          <form className='w-[75%] mx-auto'>
            <label className='mb-2 text-sm font-medium text-gray-900 sr-only'>Search</label>
            <div className='relative mx-auto w-full'>
              <input className='outline-none rounded-3xl pb-3 pt-2 bg-gray-100 w-full mx-auto px-3 placeholder:text-sm' type='search' placeholder='Search for laptops or hardwares ....' />
              <div className='absolute items-center flex inset-y-0 pr-3 right-0'><BsSearch /></div>
            </div>
          </form>
        </div>
        {/* <Categorybar /> */}

      </div>

    </>
  )
}
export default Header

