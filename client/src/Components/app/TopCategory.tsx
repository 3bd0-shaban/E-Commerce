'use client';
import React from 'react'
import { useGetCategoryQuery } from '@Redux/APIs/CategoryApi';
import GetError from '@lib/GetError';
import Image from 'next/image';

export default function TopCategory() {
    const { data: Category, isFetching, isError, error } = useGetCategoryQuery();
    return (
        <div className='py-5 bg-white container max-w-[120rem] select-none'>
            {isFetching ? <p>Featvhing</p> : isError ?
                <GetError error={error} danger /> :
                <div className='text-black mt-7 font-light text-xl font-poppins
                     grid grid-cols-3 md:grid-cols-3 xl:grid-cols-6 justify-center text-center gap-6'>

                    {Category?.slice(0, 6).map((cat) => (
                        <div key={cat._id} className='rounded-xl font-semibold text-gray-700'>
                            <Image
                                height={500}
                                width={500}
                                draggable={false}
                                src={cat.image?.url} className='h-32 w-32 object-contain mx-auto'
                                alt=''
                            />
                            <p className='mb-3' >{cat.category}</p>
                        </div>
                    ))}

                </div>
            }
        </div>
    )
}