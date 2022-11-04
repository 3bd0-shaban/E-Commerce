import { Link } from 'react-router-dom'
import React from 'react'

const SecNavbar = () => {

    return (
        <div className='container max-w-8xl flex items-center pt-2'>
            <div className='flex gap-7 text-white justify-center mx-auto '>
                <ul className='container px-0 flex gap-2 lg:gap-5 text-white font-mono font-semibold text-base lg:text-lg'>
                    <Link className='border-b-2 border-b-transparent hover:border-b-2 hover:border-b-white transition ease-in-out duration-300' to='/'>Home</Link>
                    <Link className='border-b-2 border-b-transparent hover:border-b-2 hover:border-b-white transition ease-in-out duration-300  dropdown'>Category</Link>
                    <Link className='border-b-2 border-b-transparent hover:border-b-2 hover:border-b-white transition ease-in-out duration-300' to='/dashboard/all_users'>Dashboard</Link>
                    <Link className='border-b-2 border-b-transparent hover:border-b-2 hover:border-b-white transition ease-in-out duration-300'>Servic</Link>
                    <Link className='border-b-2 border-b-transparent hover:border-b-2 hover:border-b-white transition ease-in-out duration-300'>Cantact Us</Link>
                    <Link className='border-b-2 border-b-transparent hover:border-b-2 hover:border-b-white transition ease-in-out duration-300'>Home</Link>
                </ul>
            </div>
        </div>
    )
}

export default SecNavbar
