'use client';
import Link from 'next/link';
import React from 'react';

interface LogoProps{
    Font?: string
}
const Logo: React.FC<LogoProps> = ({ Font }) => {
    return (
        <Link draggable={false} href='/' className={`flex gap-10 items-center select-none text-2xl  ${Font}`}>
            <div className='flex gap-2 relative'>
                <p className='font-bold font-sans text-gray-800 dark:text-white'>TECH</p>
                <span className="w-2 h-2 bg-blue-700 rounded-full flex self-end"></span>
                <p className='absolute top-0 -right-12 font-thin font-serif text-xs text-gray-500'>Market</p>
            </div>
        </Link>
    )
}

export default Logo
