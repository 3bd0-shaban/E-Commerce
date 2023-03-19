import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetCategoryQuery } from '../../../Redux/APIs/CategoryApi';
import { FeaturesAction } from './../../../Redux/Slices/FeaturesSlice';
import { BiChevronRight } from 'react-icons/bi';
import { BsArrowLeftShort } from 'react-icons/bs';

const SideBarMain = () => {
    const dispatch = useDispatch();
    const { HomeSideBar } = useSelector(state => state.Features)
    const { data: Category, isFetching, isError } = useGetCategoryQuery('Category List') || {};
    const [SubCat, setSubCat] = useState();
    const [showsub, setShowSub] = useState(false);
    return (
        HomeSideBar &&
        <>
            <div onClick={() => dispatch(FeaturesAction.Show_HomeSideBar(false))} className={HomeSideBar ? "backdrop opened" : 'backdrop closed'}></div>
            <div className={HomeSideBar ? "sidebar opened" : 'sidebar closed'}>
                {isFetching ?
                    <div><div className="animate-pulse p-2 w-80 h-full bg-gray-300 select-none rounded"></div></div>
                    : isError ?
                        <>Error while fetching category</>
                        : (
                            <div
                                className='rounded-xl select-none bg-[#F8F8F8]'>
                                <div className="text-black mt-5 font-light text-xl font-poppins block">
                                    {Category &&
                                        Category?.map((cat) => (
                                            <div key={cat._id}
                                                onClick={() => { setSubCat(cat.subcategory); setShowSub(true) }}
                                                className="py-2 px-6 w-80 font-semibold text-gray-700 cursor-pointer">
                                                <div className="flex justify-between">
                                                    <p className="mb-3 relative">{cat.category}</p>
                                                    <BiChevronRight />
                                                </div>

                                            </div>
                                        ))}
                                </div>

                            </div>
                        )}
            </div>
            {showsub &&
                <>
                    <div className={showsub ? "sidebar opened" : 'sidebar closed'}>
                        {isFetching ?
                            <div><div className="animate-pulse p-2 w-80 h-full bg-gray-300 rounded"></div></div>
                            : isError ?
                                <>Error while fetching category</>
                                : (
                                    <>
                                        <div onClick={() => setShowSub(false)} className='text-3xl select-none mx-3 mt-3 cursor-pointer h-10 w-10 hover:bg-gray-200 focus:bg-gray-300 duration-300 rounded-full flex justify-center items-center'><BsArrowLeftShort /></div><hr />
                                        <div className="font-light text-xl font-poppins block">
                                            <div
                                                className="text-gray-500 font-light text-xl font-poppins">
                                                {SubCat?.map((sub) => (
                                                    <div key={sub._id} className="text-start">
                                                        <button className="py-3 px-6 w-80 font-semibold text-gray-700 block">
                                                            <p className="block">{sub.nameOfSub}</p>
                                                        </button>
                                                        <hr />
                                                    </div>
                                                ))}
                                            </div>
                                            <hr />
                                        </div>
                                    </>
                                )}
                    </div>
                </>
            }
        </>

    )
}
export default SideBarMain
