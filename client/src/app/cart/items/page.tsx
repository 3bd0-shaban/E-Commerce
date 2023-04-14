import React from 'react'
import CartEmpty from './CartEmpty';
import GetError from '@lib/GetError';
import HomeProducts2 from '@Components/app/HomeProducts2';
import Link from 'next/link';
import CartItem from './CartItem';
import ItemWraper from './ItemWarper';

export default function page() {
    return (
        <>
            <div className='container select-none px-0 xl:px-4 max-w-[120rem]'>
                <div className='grid grid-cols-1 xl:grid-cols-4'>
                    <ItemWraper />
                </div>
            </div>
                <HomeProducts2 />
            <div className='container px-0 max-w-[170rem]'>
            </div>
        </>
    )
}
