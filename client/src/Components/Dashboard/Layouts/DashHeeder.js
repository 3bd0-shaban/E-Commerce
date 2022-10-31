import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { MdNotifications } from 'react-icons/md'
import { RiMessage3Fill } from 'react-icons/ri'
import { CgDetailsMore } from 'react-icons/cg'
const DashHeeder = () => {
  return (
    <div className='fixed lg:ml-80 bg-white z-10 border-b py-3 w-full'>
      <div className='flex'>
        <div className='flex text-2xl lg:hidden items-center gap-4 text-gray-700 mr-3'>
          <CgDetailsMore />
        </div>
        <form className='lg:pl-12 pl-4 w-full'>
          <label className='mb-2 text-sm font-medium text-gray-900 sr-only'>Search</label>
          <div className='relative mx-auto'>
            <input className='outline-none w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-8 pb-3 pt-2 mx-auto placeholder:text-sm' type='search' placeholder='Search In Dashboard ....' />
            <div className='absolute items-center flex inset-y-0 left-0'><BsSearch /></div>
          </div>
        </form>
        <div className='text-2xl flex items-center gap-4 text-gray-700 mr-3 ml-auto lg:pr-[22rem]'>
          <RiMessage3Fill />
          <MdNotifications style={{ 'fontSize': '2rem' }} />
          <FaUser />
        </div>
      </div>
    </div>
  )
}

export default DashHeeder
