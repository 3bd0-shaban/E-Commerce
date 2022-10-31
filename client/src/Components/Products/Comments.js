import React from 'react'
import { Rating } from './../Exports'

const Comments = () => {
    return (
        <div>
            <Rating />
            <p className="text-sm font-medium text-gray-500 ">1,745 global ratings</p>
            <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600">5 star</span>
                <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded">
                    <div className="h-5 bg-yellow-400 rounded w-[70%]"></div>
                </div>
                <span className="text-sm font-medium text-blue-600 ">70%</span>
            </div>
            <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 ">4 star</span>
                <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded">
                    <div className="h-5 bg-yellow-400 rounded w-[17%]"></div>
                </div>
                <span className="text-sm font-medium text-blue-600 ">17%</span>
            </div>
            <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 ">3 star</span>
                <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded">
                    <div className="h-5 bg-yellow-400 rounded w-[8%]"></div>
                </div>
                <span className="text-sm font-medium text-blue-600 ">8%</span>
            </div>
            <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 ">2 star</span>
                <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded">
                    <div className="h-5 bg-yellow-400 rounded w-[4%]"></div>
                </div>
                <span className="text-sm font-medium text-blue-600 ">4%</span>
            </div>
            <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 ">1 star</span>
                <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded">
                    <div className="h-5 bg-yellow-400 rounded w-[1%]"></div>
                </div>
                <span className="text-sm font-medium text-blue-600 ">1%</span>
            </div>
            <div className='border w-full mt-5 py-4'>
                <div className='flex gap-2'>
                    <img className="w-10 h-10 rounded-full" src="https://res.cloudinary.com/abdo9/image/upload/v1664894521/samples/ecommerce/istockphoto-1300845620-612x612_rpokfs.jpg" alt="" />
                    <input className='outline-none border-none placeholder:text-sm font-thin font-poppins' type='text' placeholder='Write comment'></input>
                </div>
            </div>
        </div>
    )
}

export default Comments
