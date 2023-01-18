import React from 'react'
import { useGetBannerTopQuery } from '../../../Redux/APIs/BannerApi';

const SideBanner = () => {
    const { data: topbanner } = useGetBannerTopQuery() || {};

    return (
        <div className='hidden xl:flex max-w-full'>
            <div className='grid grid-cols-1 gap-2'>
                {topbanner?.map(banner => (
                    <img className='w-full object-cover h-[17rem]' src={banner?.banners?.url} alt='' />
                ))}
            </div>
        </div>
    )
}

export default SideBanner
