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
                        <div className='text-6xl'><BsCursor /></div>
                        <div>
                            <p className='text-3xl font-bold font-serif'>Sign up for Newsletter</p>
                        </div>
                    </div>
                    <form className='w-full flex justify-center '>
                        <div className="relative w-full">
                            <input type="search" className="py-4 px-4 w-full text-sm rounded-lg text-gray-900 bg-gray-50 border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter Your Email Address " required="" />
                            <button className="absolute top-0 right-0 py-4 px-10 text-sm font-semibold tracking-wide text-white border rounded-r-lg border-blue-700 hover:border-blue-800 bg-blue-700 hover:bg-blue-800">Submit</button>
                        </div>
                    </form>
                    <div className='flex gap-5 justify-center'>
                        <div className='flex gap-3 items-center text-gray-500'>
                            <span className='text-2xl'><FaFacebookF /></span>
                            <p className='text-2xl font-semibold font-serif'>FaceBook</p>
                        </div>
                        <div className='flex gap-3 items-center text-gray-500'>
                            <span className='text-2xl'><BsTwitter /></span>
                            <p className='text-2xl font-semibold font-serif'>Twitter</p>
                        </div>
                        <div className='flex gap-3 items-center text-gray-500'>
                            <span className='text-2xl'><BsGoogle /></span>
                            <p className='text-2xl font-semibold font-serif'>Google</p>
                        </div>
                    </div>
                </div>
                <div className=' border-t shadow mt-10'>
                    <div className='container max-w-[140rem]'>
                        <div className='grid grid-cols-2 space-y-8 lg:grid-cols-2 xxl:grid-cols-4 py-10'>
                            <div>
                                <div className='py-3'><Logo /></div>
                                <div className='flex gap-6'>
                                    <div className='text-[6rem] text-gray-700'><BsHeadset /></div>
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
                            <div className='text-gray-500'>
                                <Link className='block py-2 text-lg font-medium'>Laptops, Ultrabooks & Computers</Link>
                                <Link className='block py-2 text-lg font-medium'>Cameras & Photography</Link>
                                <Link className='block py-2 text-lg font-medium'>Smart Phones & Tablets</Link>
                                <Link className='block py-2 text-lg font-medium'>Video Games B Consoles</Link>
                                <Link className='block py-2 text-lg font-medium'>TV &Audio</Link>
                                <Link className='block py-2 text-lg font-medium'>Gadgets</Link>
                                <Link className='block py-2 text-lg font-medium'>Car Electronic & GPS</Link>
                            </div>
                            <div className='text-gray-500'>
                                <Link className='block py-2 text-lg font-medium'>Printer & lnk</Link>
                                <Link className='block py-2 text-lg font-medium'>Software</Link>
                                <Link className='block py-2 text-lg font-medium'>Office Supplies</Link>
                                <Link className='block py-2 text-lg font-medium'>Computer Components</Link>
                                <Link className='block py-2 text-lg font-medium'>Virtual Reality</Link>
                                <Link className='block py-2 text-lg font-medium'>Smartwatches</Link>
                            </div>

                            <div className='text-gray-500'>
                                <p>CUSTOMER CAREt</p>
                                <div>
                                    <Link className='block py-2 text-lg font-medium'>My Account</Link>
                                    <Link className='block py-2 text-lg font-medium'>Track your Order</Link>
                                    <Link className='block py-2 text-lg font-medium'>Wishlist</Link>
                                    <Link className='block py-2 text-lg font-medium'>Returns & Exchange</Link>
                                    <Link className='block py-2 text-lg font-medium'>FAQ</Link>
                                    <Link className='block py-2 text-lg font-medium'>Product Support</Link>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='container max-w-full py-5 bg-gray-900 text-white text-center font-medium'>
                        <p>CopyRight @ 2022, Tech-Market eCommerce .All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
