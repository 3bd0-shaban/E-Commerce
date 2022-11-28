import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <Link to='/' className='flex gap-10 items-center'>
            <div className='flex gap-2 text-4xl relative'>
                <p className='font-bold font-sans text-gray-800'>TECH</p>
                <span className="w-3.5 h-3.5 bg-blue-700 rounded-full flex self-end"></span>
                <p className='absolute top-0 -right-12 font-thin font-serif text-lg text-gray-500'>Market</p>
            </div>
        </Link>
    )
}

export default Logo
