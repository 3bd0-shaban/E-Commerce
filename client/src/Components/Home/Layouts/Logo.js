import React from 'react'
import { Link } from 'react-router-dom'

const Logo = (props) => {
    return (
        <Link draggable={false} to='/' className={`flex gap-10 items-center select-none text-4xl ${props.Font}`}>
            <div className='flex gap-2  relative'>
                <p className='font-bold font-sans text-gray-800'>TECH</p>
                <span className="w-3.5 h-3.5 bg-blue-700 rounded-full flex self-end"></span>
                <p className='absolute top-0 -right-12 font-thin font-serif text-lg text-gray-500'>Market</p>
            </div>
        </Link>
    )
}

export default Logo
