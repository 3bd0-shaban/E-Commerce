import React from 'react'
import { useGetBannerTopQuery } from '../../../Redux/APIs/BannerApi';

const SideBanner = () => {
    const { data: topbanner } = useGetBannerTopQuery() || {};

    return (
        <div className='hidden xl:flex max-w-full select-none'>
            <div className='grid grid-cols-1 gap-2'>
                {topbanner?.map(banner => (
                    <img draggable={false} key={banner?._id} className='w-full object-cover h-[17rem]' src={banner?.banners?.url} alt='' />
                ))}
            </div>
        </div>
    )
}

export default SideBanner
