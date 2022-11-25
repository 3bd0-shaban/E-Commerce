import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className=' border-t shadow mt-10'>
            <div className='container max-w-[140rem]'>
                <Link to='/' className='flex gap-10 items-center'>
                    <div className='flex gap-2 text-4xl relative'>
                        <p className='font-bold font-sans text-gray-800'>TECH</p>
                        <span className="w-3.5 h-3.5 bg-blue-700 rounded-full flex self-end"></span>
                        <p className='absolute top-0 -right-12 font-thin font-serif text-lg text-gray-500'>Market</p>
                    </div>
                    <div className='ml-6'>
                    </div>
                </Link>

                <div className='grid grid-cols-1 lg:grid-cols-2 xxl:grid-cols-5'>
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
                    <div>
                        <p className='uppercase font-medium text-gray-700'>got question ? call us on </p>
                        <p className='uppercase font-semibold text-gray-900 text-2xl py-4'>0354824 </p>
                        <p className='uppercase font-medium text-gray-700'>17 Princess Road, London,
                            Greater London NW1 8JR, UK </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
