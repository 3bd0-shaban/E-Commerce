'use client';
import Logo from '@Components/Layouts/Logo';
import { siteFeatures } from '@config/siteFeatures';
import Link from 'next/link';
import React from 'react'
import { BsCursor, BsHeadset } from 'react-icons/bs';

const Footer: React.FC = () => {

    return (
        <>
            <div className='container px-0 max-w-full shadow-xl bg-[#F9F9F9] select-none'>
                <div className='text-gray-500 grid grid-cols-1 xl:grid-cols-3 gap-5 items-center justify-between container max-w-[100rem] py-3'>
                    <div className='flex gap-8 items-center justify-center '>
                        <BsCursor />
                        <p className='text-xl xl:text-xl font-bold font-serif'>Sign up for Newsletter</p>
                    </div>
                    <form className='w-full flex justify-center '>
                        <div className="relative w-full">
                            <input
                                type="search"
                                className="py-3 px-4 w-full text-sm rounded-lg text-gray-900 
                                bg-gray-50 border outline-none border-gray-300
                                focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter Your Email Address "
                                required
                            />
                            <button
                                className="absolute top-0 right-0 py-3 px-4 md:px-10 text-sm font-semibold 
                                tracking-wide text-white border rounded-r-lg border-blue-700
                                 hover:border-blue-800 bg-blue-700 hover:bg-blue-800">
                                Submit
                            </button>
                        </div>
                    </form>
                    <div className='flex gap-5 items-center px-5'>
                        {siteFeatures.Footer.SocailIcons.map((item, index) => (
                            <div key={index} className='flex gap-3 items-center text-gray-500
                             whitespace-nowrap text-sm xl:font-semibold font-serif'>
                                <span className='text-lg'>{item.icon}</span>
                                <p className=''>{item.title}</p>
                            </div>
                        ))}

                    </div>
                </div>
                <div className=' border-t shadow'>
                    <div className='container max-w-[100rem]'>
                        <div className='grid grid-cols-1 md:grid-cols-2 space-y-8 lg:grid-cols-2 xl:grid-cols-4 gap-10 p-6'>
                            <div>
                                <div className='py-2'><Logo /></div>
                                <div className='flex gap-1 xl:gap-6'>
                                    <BsHeadset size={40} />
                                    <div className='font-medium'>
                                        <p className='text-gray-700'>got question ? call us on </p>
                                        <p className='text-gray-700 text-2xl py-4'>0354824 </p>
                                        <p className='text-gray-500 text-xs spce-y-3'>
                                            {`17 Princess Road, London,`}
                                            <span className='my-2 block'>
                                                {`Greater London NW1 8JR, UK`}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='text-gray-500 font-medium text-sm'>
                                {siteFeatures.Footer.categoryOne.map((item, index) => (
                                    <Link
                                        href='/'
                                        key={index}
                                        draggable={false}
                                        className='block py-2'>
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                            <div className='text-gray-500 font-medium text-sm'>
                                {siteFeatures.Footer.categoryTwo.map((item, index) => (
                                    <Link
                                        href='/'
                                        key={index}
                                        draggable={false}
                                        className='block py-2'>
                                        {item.title}
                                    </Link>
                                ))}
                            </div>

                            <div className='text-gray-500'>
                                <p>CUSTOMER CAREt</p>
                                <div className='font-medium text-sm'>
                                    {siteFeatures.Footer.contactInfo.map((item, index) => (
                                        <Link
                                            href='/'
                                            key={index}
                                            draggable={false}
                                            className='block py-2'>
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='container max-w-full py-3 bg-gray-900 text-center text-white text-sm'>
                        <p>CopyRight @ 2022, Tech-Market eCommerce. All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
