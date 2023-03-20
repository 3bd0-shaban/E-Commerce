import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { MdNotifications } from 'react-icons/md'
import { RiMessage3Fill } from 'react-icons/ri'
import { CgDetailsMore } from 'react-icons/cg'
// import { useProSidebar } from 'react-pro-sidebar';
import { useDispatch } from 'react-redux';
import { FeaturesAction } from './../../../Redux/Slices/FeaturesSlice';
import { IoReorderThreeOutline } from 'react-icons/io5'
const DashHeeder = ({ setIsSideMargin, setIsSideWidth, sideMargin }) => {
  const dispatch = useDispatch()
  // const { toggleSidebar } = useProSidebar();
  return (
    <header className='fixed bg-white z-10 border-b py-3 w-full duration-300'
      style={{ paddingLeft: `${sideMargin}` }}>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5 px-3 items-center'>
          <button
            onClick={() => {
              setIsSideMargin((sideMargin !== '300px') ? '300px' : '63px');
              setIsSideWidth((sideMargin !== '300px') ? '300px' : '63px')
            }}
            className='rounded-full h-10 w-10 flex justify-center items-center active:scale-90 duration-200 bg-blue-500 text-white'><IoReorderThreeOutline size={25} /></button>
          <div className='flex text-2xl lg:hidden items-center gap-4 text-gray-700 mr-3'>
            <button onClick={() => dispatch(FeaturesAction.ShowSideBar())}><CgDetailsMore /></button>
          </div>
          <form className='w-96'>
            <label className='mb-2 text-sm font-medium text-gray-900 sr-only'>Search</label>
            <div className='relative mx-auto w-full'>
              <input className='outline-none w-[30rem] md:w-1/2 lg:w-1/2 xl:w-1/2 px-8 pb-3 pt-2 mx-auto placeholder:text-sm' type='search' placeholder='Search In Dashboard ....' />
              <div className='absolute items-center flex inset-y-0 left-0'><BsSearch /></div>
            </div>
          </form>
        </div>
        <div className='text-2xl flex items-center gap-4 text-gray-700 mr-3 ml-auto'>
          <RiMessage3Fill />
          <MdNotifications style={{ 'fontSize': '2rem' }} />
          <button onClick={() => dispatch(FeaturesAction.ShowSideBar())}><FaUser /></button>
        </div>
      </div>
    </header>
  )
}

export default DashHeeder
