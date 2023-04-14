'use client';
import Link from 'next/link';
import { FC } from 'react'
import { FaShoppingBag } from 'react-icons/fa'

interface emptyCartProps {

}

const CartEmpty: FC<emptyCartProps> = ({ }) => {
    return (
        <div className='text-center'>
            <p className='text-xl py-2'>Your cart is empty</p>
            <div className='text-[18rem] flex justify-center text-green-600'>
                <FaShoppingBag />
            </div>
            <p className='py-4'>Go to main page and shope for your products</p>
            <Link
                draggable={false}
                href='/'
                className='border border-green-300 rounded-2xl text-2xl text-white bg-green-600 py-2 px-3'>
                Browse Products
            </Link>
        </div>
    )
}

export default CartEmpty