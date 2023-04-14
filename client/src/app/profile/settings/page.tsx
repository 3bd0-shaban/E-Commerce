import React from 'react'
import Image from 'next/image';
import Info from './Info';
import Password from './Password';

const page: React.FC = () => {

    return (
        <div className=''>
            <h3 className='text-lg font-semibold'>Personal Information :</h3>
            <div className='py-5 grid grid-cols-1 lg:grid-cols-2'>
                <div className='lg:flex gap-5 mx-auto text-center lg:text-start'>
                    <Image
                        height={500}
                        width={500}
                        className='w-20 h-20 mx-auto rounded-full'
                        src='/Images/Clients/09.jpg'
                        alt=''
                    />
                    <div className='mt-3'>
                        <p className='font-medium text-lg'>Upload your picture</p>
                        <p className='text-gray-500 text-sm'>
                            For best results, use an image at least 256px
                            <br />
                            by 256px in either .jpg or .png format
                        </p>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <button
                        aria-label='upload'
                        className='bg-blue-600 active:bg-blue-700 text-white font-medium
                         w-full py-2 my-3 rounded-md border border-blue-200 dark:border-none'>
                        Upload
                    </button>
                    <button
                        aria-label='remove'
                        className='bg-sky-100 active:bg-sky-200 active:shadow-blue-300
                         text-sky-400 w-full py-2 my-3 rounded-md 
                        shadow-blue-200 shadow-md border border-blue-200'>
                        Remove
                    </button>
                </div>
            </div>
            <Info />
            <div className='space-y-5'>
                <h3 className='text-lg font-semibold'>Personal Information :</h3>
                <Password />
            </div>
            <form className='space-y-3 my-5'>
                <h3 className='text-lg font-semibold text-red-500'>Delete Account :</h3>
                <p className='text-gray-400'>
                    {`Do you want to delete the account? Please press below "Delete" button`}
                </p>
                <button
                    aria-label='save changes'
                    className='bg-orange-600 active:bg-orange-700 text-white w-36 font-medium py-2 my-3 
                    rounded-md border border-orange-200 dark:border-none'>
                    Save Changes
                </button>
            </form>
        </div>
    )
}

export default page
