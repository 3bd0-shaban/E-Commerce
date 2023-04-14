'use client';
import React from 'react'
import { useGetBannerSideQuery } from '@Redux/APIs/BannerApi';
import Image from 'next/image';

const SideImages = () => {
    const { data: Sidebanner } = useGetBannerSideQuery() || {};
    return (
        <div className='hidden xl:flex max-w-[3full select-none'>
            <div className='grid grid-cols-1 gap-2'>
                {Sidebanner?.map(banner => (
                    <Image
                        height={500}
                        width={500}
                        draggable={false}
                        key={banner?._id}
                        className='w-full object-cover h-[17rem]'
                        src={banner?.banners?.url}
                        alt='banner'
                    />
                ))}
            </div>
        </div>
    )
}

export default SideImages
