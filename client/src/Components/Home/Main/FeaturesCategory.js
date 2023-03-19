import React from 'react'
import { useGetCategoryQuery } from '../../../Redux/APIs/CategoryApi';
import { Danger } from '../../../Utils/Alerts';

const FeaturesCategory = () => {
    const { data: Category, isFetching, isError, error } = useGetCategoryQuery() || {};
    return (
        <div className='py-5 bg-white container max-w-[120rem] select-none'>
            {isFetching ? <p>Featvhing</p> : isError ? <Danger error={error?.data?.msg || 'Can not load Categories'} className={'container px-1.5'} /> :
                <div className='text-black mt-7 font-light text-xl font-poppins grid grid-cols-3 md:grid-cols-3 xl:grid-cols-6 justify-center text-center gap-6'>
                    {Category &&
                        Category?.slice(0, 6).map((cat) => (
                            <div key={cat._id} className='rounded-xl font-semibold text-gray-700'>
                                <img draggable={false} src={cat.image.url} className='h-32 w-32 object-contain mx-auto' alt='' />
                                <p className='mb-3' >{cat.category}</p>
                            </div>
                        ))}
                </div>}
        </div>
    )
}

export default FeaturesCategory
