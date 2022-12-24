import React from 'react'
import { BsCursor, BsGoogle, BsHeadset, BsTwitter } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
    return (
        <>
            <div className='container px-0 max-w-full shadow-xl bg-[#F9F9F9]'>
                <div className='mt-12 pt-9 text-gray-500 grid grid-cols-1 xl:grid-cols-3 space-y-5 justify-between items-center container max-w-[140rem]'>
                    <div className='flex gap-5 items-center justify-center'>
                        <div className='text-2xl xl:text-6xl'><BsCursor /></div>
                        <div>
                            <p className='text-xl xl:text-3xl font-bold font-serif'>Sign up for Newsletter</p>
                        </div>
                    </div>
                    <form className='w-full flex justify-center '>
                        <div className="relative w-full">
                            <input type="search" className="py-3 md:py-4 px-4 w-full text-sm rounded-lg text-gray-900 bg-gray-50 border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter Your Email Address " required="" />
                            <button className="absolute top-0 right-0 py-3 md:py-4 px-4 md:px-10 text-sm font-semibold tracking-wide text-white border rounded-r-lg border-blue-700 hover:border-blue-800 bg-blue-700 hover:bg-blue-800">Submit</button>
                        </div>
                    </form>
                    <div className='flex gap-5 justify-center'>
                        <div className='flex gap-3 items-center text-gray-500 xl:text-2xl xl:font-semibold font-serif'>
                            <span className='text-2xl'><FaFacebookF /></span>
                            <p className=''>FaceBook</p>
                        </div>
                        <div className='flex gap-3 items-center text-gray-500 xl:text-2xl xl:font-semibold font-serif'>
                            <span className='text-2xl'><BsTwitter /></span>
                            <p className=''>Twitter</p>
                        </div>
                        <div className='flex gap-3 items-center text-gray-500 xl:text-2xl xl:font-semibold font-serif'>
                            <span className='text-2xl'><BsGoogle /></span>
                            <p className=''>Google</p>
                        </div>
                    </div>
                </div>
                <div className=' border-t shadow mt-10'>
                    <div className='container max-w-[140rem]'>
                        <div className='grid grid-cols-2 space-y-8 lg:grid-cols-2 xxl:grid-cols-4 gap-10 py-10'>
                            <div>
                                <div className='py-2'><Logo /></div>
                                <div className='flex gap-1 xl:gap-6'>
                                    <div className='text-[4rem] md:text-[6rem] text-gray-700'><BsHeadset /></div>
                                    <div>
                                        <p className='uppercase font-medium text-gray-700'>got question ? call us on </p>
                                        <p className='uppercase font-semibold text-gray-700 text-2xl py-4'>0354824 </p>
                                        <p className='uppercase font-medium text-gray-500 spce-y-3'>17 Princess Road, London,<span className='my-2 block'>
                                            Greater London NW1 8JR, UK
                                        </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='text-gray-500 font-medium text-base md:text-lg'>
                                <Link className='block py-2'>Laptops, Ultrabooks & Computers</Link>
                                <Link className='block py-2'>Cameras & Photography</Link>
                                <Link className='block py-2'>Smart Phones & Tablets</Link>
                                <Link className='block py-2'>Video Games B Consoles</Link>
                                <Link className='block py-2'>TV &Audio</Link>
                                <Link className='block py-2'>Gadgets</Link>
                                <Link className='block py-2'>Car Electronic & GPS</Link>
                            </div>
                            <div className='text-gray-500 font-medium text-base md:text-lg'>
                                <Link className='block py-2'>Printer & lnk</Link>
                                <Link className='block py-2'>Software</Link>
                                <Link className='block py-2'>Office Supplies</Link>
                                <Link className='block py-2'>Computer Components</Link>
                                <Link className='block py-2'>Virtual Reality</Link>
                                <Link className='block py-2'>Smartwatches</Link>
                            </div>

                            <div className='text-gray-500'>
                                <p>CUSTOMER CAREt</p>
                                <div className='font-medium text-base md:text-lg'>
                                    <Link className='block py-2'>My Account</Link>
                                    <Link className='block py-2'>Track your Order</Link>
                                    <Link className='block py-2'>Wishlist</Link>
                                    <Link className='block py-2'>Returns & Exchange</Link>
                                    <Link className='block py-2'>FAQ</Link>
                                    <Link className='block py-2'>Product Support</Link>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='container max-w-full py-5 bg-gray-900 text-center text-white tex'>
                        <p>CopyRight @ 2022, Tech-Market eCommerce. All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
