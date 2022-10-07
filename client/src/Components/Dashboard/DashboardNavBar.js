import React from 'react'
import { BiGroup } from 'react-icons/bi'
import { BsClockHistory } from 'react-icons/bs'
import { MdOutlineArticle } from 'react-icons/md'
const DashboardNavBar = () => {
    const Cart = (props) => {
        return (
            <div className='h-44 bg-white rounded-lg border shadow  px-5 relative md:hover:scale-105 duration-100'>
                <div className='flex justify-between pt-3 '>
                    <p className='text-lg font-sans font-semibold text-gray-800'>{props.title}</p>
                    <div className={props.className}>
                        {props.icon}
                    </div>
                </div>
                <div className='flex items-center text-2xl font-semibold text-gray-600'>{props.num}</div>
                <div className='flex absolute bottom-0 pb-3'>
                    <p className='w-14 h-6 rounded-md bg-green-200 text-green-400  text-sm flex justify-center items-center font-semibold'>13%</p>
                    <p className='font-light text-sm px-3 font-poppins text-gray-500'>Since Last Week</p>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className='px-3 pb-4 rounded-md'>
                <div className='flex justify-between md:px-12 py-6'>
                    <p className='text-4xl font-serif font-semibold text-gray-600'>E-Commerce</p>
                    <div className='gap-3 flex mt-4'>
                        <button className='border px-7 py-2 rounded-lg text-sm font-semibold hover:bg-white'>Edit</button>
                        <button className='border-2 border-green-500  px-7 py-2 rounded-lg text-sm font-semibold bg-green-500 focus:border-2 focus:bg-green-400 hover:bg-greenue-700 text-white'>Create</button>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 '>
                    <Cart title='Users' num='750' icon={<BiGroup />} className='icon bg-fuchsia-500'/>
                    <Cart title='Posts' num='750' icon={<MdOutlineArticle />} className='icon bg-stone-500'/>
                    <Cart title='Total Hours' num='750' icon={<BsClockHistory />} className='icon bg-green-500'/>
                    <Cart title='Users' num='750' icon={<BiGroup />} className='icon bg-orange-500'/>
                </div>
            </div>
        </div>
    )
}

export default DashboardNavBar
