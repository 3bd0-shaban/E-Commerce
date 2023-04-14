import Logo from '@Components/Layouts/Logo'
import Themetoggle from '@Components/Layouts/Themetoggle'
import Image from 'next/image'
import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiOutlineBellAlert } from 'react-icons/hi2'

export default function Header() {
    return (
        <div className='py-8'>
            <div className='container max-w-full shadow fixed top-0 inset-x-0 py-2 bg-white dark:bg-slate-900 dark:shadow-slate-600'>
                <div className='container max-w-[120rem] flex justify-between items-center'>
                    <div className='flex items-center gap-5'>
                        <Logo />
                        <label className='relative ml-10'>
                            <input
                                type='search'
                                className='outline-none w-96 rounded-md pl-8 dark:bg-transparent'
                                placeholder='Search ...'
                            />
                            <span className='absolute inset-y-0 left-0'>
                                <BiSearch size={22} />
                            </span>
                        </label>
                    </div>
                    <div className='flex items-center gap-5'>
                        <Themetoggle />
                        <HiOutlineBellAlert size={23} />
                        <div className='flex items-center gap-3'>
                            <Image
                                height={100}
                                width={100}
                                className='w-10 h-10 rounded-full'
                                src='/Images/profile/01.jpg'
                                alt=''
                            />
                            <div className=''>
                                <p className='text-sm'>Edward Diana</p>
                                <p className='text-xs'>Founder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
