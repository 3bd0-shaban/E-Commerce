import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className=' bg-gray-50 py-5'>
      <div className='container max-w-8xl flex justify-between items-center px-1 md:px-3'>
        <Link to='/' className='font-bold font-serif text-xl md:text-3xl'>E-Commerce</Link>
        <div className='hidden lg:block'>
          <form className="flex items-center mx-auto">
            <label className="sr-only">Search</label>
            <div className="relative w-96">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <i className="fa fa-search w-4 h-4 text-gray-500  hover:text-gray-900" aria-hidden="true"></i>
              </div>
              <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full pl-10 p-2.5" placeholder="Search Laptops, Tablets, Phones ..." required="" />
              <button type="button" className="flex absolute inset-y-0 right-0 items-center pr-3">
                <i className="fa fa-microphone w-4 h-4 text-gray-500 hover:text-gray-900" aria-hidden="true"></i>
              </button>
            </div>
            <button type="submit" className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300">
              <i className="fa fa-search pr-2 "></i>Search</button>
          </form>
        </div>
        <div className='flex gap-3'>
          <Link type="button" className="inline-flex relative items-center px-3 text-sm font-medium text-center  text-white rounded-lg  focus:outline-none">
            <i className="fa fa-cart-arrow-down text-black text-xl"></i>
            <span className="sr-only">Notifications</span>
            <div className="inline-flex absolute -top-1 -right-1 justify-center items-center w-5 h-5 text-[8px] font-bold text-white bg-red-500 rounded-full border-2 border-white">20</div>
          </Link>
          <Link to='/signin' className='border text-center px-3 font-medium font-serif rounded-lg py-2 hover:bg-gray-200 focus:ring focus:ring-gray-200'>Sign In</Link>
          <Link to='/signup' className='border text-center px-3 font-medium font-serif rounded-lg py-2 hover:bg-gray-200 focus:ring focus:ring-gray-200'>Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default Header
