'use client';
import React from 'react'
import { useGetBannerTopQuery } from '@Redux/APIs/BannerApi';
import Image from 'next/image';

const SideBanner = () => {
    const { data: topbanner } = useGetBannerTopQuery() || {};

    return (
        <div className='hidden xl:flex max-w-full select-none'>
            <div className='grid grid-cols-1 gap-2'>
                {topbanner?.map(banner => (
                    <Image
                        height={500}
                        width={500}
                        draggable={false}
                        key={banner?._id}
                        className='w-full object-cover h-[12rem]'
                        src={banner?.banners?.url}
                        alt=''
                    />
                ))}
            </div>
        </div>
    )
}

export default SideBanner
