'use client';
import Logo from '@Components/Layouts/Logo';
import Link from 'next/link';
import React from 'react'
import { BsCursor, BsGoogle, BsHeadset, BsTwitter } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
interface ArrayProps {
    title?: string;
    icon?: React.ReactNode;
}
const Footer: React.FC = () => {
    const Array1: ArrayProps[] = [
        { title: 'Laptops, Ultrabooks & Computers' },
        { title: 'Cameras & Photography' },
        { title: 'Smart Phones & Tablets' },
        { title: 'Video Games B Consoles' },
        { title: 'TV &Audio' },
        { title: 'Gadgets' },
        { title: 'Car Electronic & GPS' },
    ]
    const Array2: ArrayProps[] = [
        { title: 'Printer & lnk' },
        { title: 'Software' },
        { title: 'Office Supplies' },
        { title: 'Computer Components' },
        { title: 'Virtual Reality' },
        { title: 'Smartwatches' },
    ]
    const Array3: ArrayProps[] = [
        { title: 'My Account' },
        { title: 'Track your Order' },
        { title: 'Wishlist' },
        { title: 'Returns & Exchange' },
        { title: 'FAQ' },
        { title: 'Product Support' },
    ]
    const Array4: ArrayProps[] = [
        { title: 'FaceBook', icon: <FaFacebookF /> },
        { title: 'Twitter', icon: <BsTwitter /> },
        { title: 'Google', icon: <BsGoogle /> },
        { title: 'Returns & Exchange' },
        { title: 'FAQ' },
        { title: 'Product Support' },
    ]
    return (
        <>
            <div className='container px-0 max-w-full shadow-xl bg-[#F9F9F9] select-none'>
                <div className='mt-12 pt-9 text-gray-500 grid grid-cols-1
                     xl:grid-cols-3 space-y-5 justify-between items-center container max-w-[120rem]'>
                    <div className='flex gap-8 items-center justify-center mt-4'>
                        <span className='text-2xl xl:text-3xl'><BsCursor /></span>
                        <p className='text-xl xl:text-xl font-bold font-serif'>Sign up for Newsletter</p>
                    </div>
                    <form className='w-full flex justify-center '>
                        <div className="relative w-full">
                            <input
                                type="search"
                                className="py-3 md:py-4 px-4 w-full text-sm rounded-lg text-gray-900 
                                bg-gray-50 border outline-none border-gray-300
                                focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter Your Email Address "
                                required
                            />
                            <button
                                className="absolute top-0 right-0 py-3 md:py-4 px-4 md:px-10 text-sm font-semibold 
                                tracking-wide text-white border rounded-r-lg border-blue-700
                                 hover:border-blue-800 bg-blue-700 hover:bg-blue-800">
                                Submit
                            </button>
                        </div>
                    </form>
                    <div className='flex gap-5 items-center px-5'>
                        {Array4.map((item, index) => (
                            <div key={index} className='flex gap-3 items-center text-gray-500
                             whitespace-nowrap text-sm xl:font-semibold font-serif'>
                                <span className='text-xl'>{item.icon}</span>
                                <p className=''>{item.title}</p>
                            </div>
                        ))}

                    </div>
                </div>
                <div className=' border-t shadow mt-10'>
                    <div className='container max-w-[120rem]'>
                        <div className='grid grid-cols-2 space-y-8 lg:grid-cols-2 xxl:grid-cols-4 gap-10 py-10 justify-center'>
                            <div>
                                <div className='py-2'><Logo /></div>
                                <div className='flex gap-1 xl:gap-6'>
                                    <div className='text-[4rem] md:text-[6rem] text-gray-700'><BsHeadset /></div>
                                    <div>
                                        <p className='uppercase font-medium text-gray-700'>got question ? call us on </p>
                                        <p className='uppercase font-semibold text-gray-700 text-2xl py-4'>0354824 </p>
                                        <p className='uppercase font-medium text-gray-500 spce-y-3'>
                                            {`17 Princess Road, London,`}
                                            <span className='my-2 block'>
                                                {`Greater London NW1 8JR, UK`}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='text-gray-500 font-medium text-base md:text-lg'>
                                {Array1.map((item, index) => (
                                    <Link
                                        href='/'
                                        key={index}
                                        draggable={false}
                                        className='block py-2'>
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                            <div className='text-gray-500 font-medium text-base md:text-lg'>
                                {Array2.map((item, index) => (
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
                                <div className='font-medium text-base md:text-lg'>
                                    {Array3.map((item, index) => (
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

                    <div className='container max-w-full py-5 bg-gray-900 text-center text-white tex'>
                        <p>CopyRight @ 2022, Tech-Market eCommerce. All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
