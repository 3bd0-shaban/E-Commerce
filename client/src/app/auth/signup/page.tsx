import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Form from './Form';
import { BsCheck2 } from 'react-icons/bs';
const SignUp = () => {

    return (
        <div className='container px-0 mt-8'>
            <div className='container grid grid-cols-1 lg:grid-cols-2'>
                <div className='container px-0 lg:max-w-[60%]'>
                    <p className="text-xl font-semibold text-gray-700 my-3">Create New Account</p>
                    <Form />
                </div>
                <div className='conatiner lg:max-w-[60%]'>
                    <form>
                        <p className='text-2xl font-semibold text-gray-700 my-3'>New Customer</p><hr />
                        <div className='my-6'>
                            <p className='font-medium text-lg text-gray-700'>Creating an acount today  yo reap the beneits of personalized shopping experince </p>

                        </div>
                        <div>
                            <p className='text-2xl font-medium text-gray-600'>Sign Up today and you will be able to :</p>
                            <div className='px-4 font-light text-md my-4 space-y-4'>
                                <div className='flex items-center gap-4 text-lg'>
                                    <BsCheck2 style={{ color: 'blue' }} />
                                    <p>Track your order easily</p>
                                </div>
                                <div className='flex items-center gap-4 text-lg'>
                                    <BsCheck2 style={{ color: 'blue' }} />
                                    <p>Speed yourway through the checkout</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
