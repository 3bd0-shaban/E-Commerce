import React from 'react'
import { useGetBrandQuery } from '../../../Redux/APIs/BrandApi';
import { Danger } from '../../../Utils/Alerts';
const HomeBrand = () => {
    const { data: Brand, isFetching, isError, error } = useGetBrandQuery() || {};

    return (
        <div className='bg-white select-none'>
            {isFetching ? <p>Fetching</p> : isError ? <Danger error={error?.data?.msg || 'Can not load Brands'} /> :
                <div className='text-black mt-2 xl:mt-5 font-light text-sm xl:text-xl font-poppins grid grid-cols-6 justify-center items-center text-center gap-0 xl:gap-6'>
                    {Brand &&
                        Brand?.map((cat) => (
                            <div key={cat._id} className='py-2 xl:px-6 rounded-xl xl:bg-[#F8F8F8] font-semibold text-gray-700'>
                                <img draggable={false} src={cat.image.url} className='h-[4rem] xl:h-32 p-3 xl:object-contain mx-auto' alt='' />
                                <p className='mb-3'>{cat.brand}</p>
                            </div>
                        ))}
                </div>}
        </div>
    )
}

export default HomeBrand
