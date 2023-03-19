import React from 'react'
import { useGetBannerSideQuery } from '../../../Redux/APIs/BannerApi';

const SideImages = () => {
    const { data: Sidebanner } = useGetBannerSideQuery() || {};
    return (
        <div className='hidden xl:flex max-w-[3full select-none'>
            <div className='grid grid-cols-1 gap-2'>
                {Sidebanner?.map(banner => (
                    <img draggable={false} key={banner?._id} className='w-full object-cover h-[17rem]' src={banner?.banners?.url} alt='' />
                ))}
            </div>
        </div>
    )
}

export default SideImages
