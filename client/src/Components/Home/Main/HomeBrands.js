import React from 'react'
import { useGetBrandQuery } from '../../../Redux/APIs/BrandApi';
const HomeBrand = () => {
    const { data: Brand, isFetching, isError } = useGetBrandQuery() || {};

    return (
        <div className=' bg-white'>
            {isFetching ? <p>Featvhing</p> : isError ? <>Error while fetching Brand</> :
                <div className='text-black mt-5 font-light text-xl font-poppins grid grid-cols-6 justify-center text-center gap-6'>
                    {Brand &&
                        Brand?.map((cat) => (
                            <div key={cat._id} className='py-2 px-6 rounded-xl bg-[#F8F8F8] font-semibold text-gray-700'>
                                <img src={cat.image.url} className='h-44 object-contain mx-auto' alt='' />
                                <p className='mb-3' >{cat.brand}</p>
                            </div>
                        ))}
                </div>}
        </div>
    )
}

export default HomeBrand
