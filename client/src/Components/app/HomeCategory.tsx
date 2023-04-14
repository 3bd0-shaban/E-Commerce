'use client';
import React, { useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { useGetCategoryQuery } from '@Redux/APIs/CategoryApi';
import Link from 'next/link';
import { subCategoryType } from '@lib/types/category';
import GetError from '@lib/GetError';
interface CategoryProps {
  Height?: string;
}
const HomeCategory: React.FC<CategoryProps> = ({ Height }) => {
  const { data: Category, isFetching, isError, error } = useGetCategoryQuery();
  const [SubCat, setSubCat] = useState<subCategoryType[]>([]);
  const [show, setShow] = useState<Boolean>(false);
  return (
    <>
      {isFetching ?
        <div className="animate-pulse p-2 w-80 h-full bg-gray-300 rounded hidden lg:block"></div>
        : isError ?
          <GetError error={error} />
          : (
            <div
              className={
                show
                  ? `rounded-l-lg bg-[#F8F8F8] hidden lg:block relative ${Height}`
                  : `rounded-xl bg-[#F8F8F8] hidden lg:block relative ${Height}`
              }
            >

              <div className="text-black mt-5 font-light text-xl font-poppins block select-none">
                {Category?.map((cat) => (
                  <div
                    key={cat._id}
                    onMouseEnter={() => { setSubCat(cat.subcategory); setShow(true); }}
                    onMouseLeave={() => setShow(false)}
                    className="py-2 px-6 w-80 font-semibold text-gray-700 cursor-pointer">
                    <div className="flex justify-between">
                      <p className="mb-3 relative hover:ml-3 duration-300">{cat.category}</p>
                      <BiChevronRight />
                    </div><hr />
                  </div>
                ))}
                {show && (
                  <div
                    onMouseLeave={() => setShow(false)}
                    onMouseEnter={() => setShow(true)}
                    className="absolute -top-5 py-5 left-80 h-full bg-[#F8F8F8] 
                    rounded-r-lg text-start z-10 text-black mt-5 font-light text-xl font-poppins">
                    {SubCat?.map((sub) => (
                      <div key={sub._id} className="text-start">
                        <Link
                          draggable={false}
                          href={`/product?category=${sub._id}`}
                          className="py-3 px-6 w-80 font-semibold text-gray-700 block">
                          <p className="block">{sub.nameOfSub}</p>
                        </Link>
                        <hr />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
    </>
  );
};

export default HomeCategory;