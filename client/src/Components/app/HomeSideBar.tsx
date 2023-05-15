'use client';
import React, { useState } from 'react'
import { useGetCategoryQuery } from '@Redux/APIs/CategoryApi';
import { FeaturesAction } from '@Redux/Slices/FeaturesSlice';
import { BiChevronRight } from 'react-icons/bi';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '@Hooks/useRedux';
import { subCategoryType } from '@lib/types/category';

export default function SideBarMain() {

    const dispatch = useAppDispatch();
    const { HomeSideBar } = useAppSelector(state => state.Features)
    const { data: Category, isFetching, isError } = useGetCategoryQuery() || {};
    const [SubCat, setSubCat] = useState<subCategoryType[]>();
    const [showsub, setShowSub] = useState<Boolean>(false);
    return (
        HomeSideBar &&
        <>
            <div
                onClick={() => dispatch(FeaturesAction.Show_HomeSideBar())}
                className={HomeSideBar ? "backdrop opened" : 'backdrop closed'}>
            </div>
            <div className={HomeSideBar ? "sidebar opened" : 'sidebar closed'}>
                {isFetching ?
                    <div className="animate-pulse p-2 w-80 h-full bg-gray-300 select-none rounded"></div>
                    : isError ?
                        <>Error while fetching category</>
                        : (
                            <div
                                className='rounded-xl select-none bg-[#F8F8F8]'>
                                <div className="text-black mt-5 font-light text-xl font-poppins block">
                                    {Category?.map((cat) => (
                                        <div key={cat._id}
                                            onClick={() => { setSubCat(cat?.subcategory as subCategoryType[]); setShowSub(true) }}
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
                                        <div
                                            onClick={() => setShowSub(false)}
                                            className='text-3xl select-none mx-3 mt-3 cursor-pointer h-10 w-10
                                             hover:bg-gray-200 focus:bg-gray-300 duration-300 rounded-full flex justify-center items-center'>
                                            <BsArrowLeftShort />
                                        </div>
                                        <hr />
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
