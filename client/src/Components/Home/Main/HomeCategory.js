import React, { useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { useGetCategoryQuery } from '../../../Redux/APIs/CategoryApi';
// import { FeaturesAction } from './../../../Redux/Slices/FeaturesSlice';
// import { useDispatch, useSelector } from 'react-redux';
const HomeCategory = (props) => {
  const { data: Category, isFetching, isError } = useGetCategoryQuery();
  const [SubCat, setSubCat] = useState();
  const [show, setShow] = useState(false);
  // const dispatch = useDispatch();
  // const { CategorySlide } = useSelector(state => state.Features);
  console.log(SubCat);
  return (
    <>
      <div
        className={
          show
            ? `rounded-l-lg bg-[#F8F8F8] hidden lg:block relative ${props.Hight}`
            : `rounded-xl bg-[#F8F8F8] hidden lg:block relative ${props.Hight}`
        }
      >
        {isFetching ? (
          <p>Fetching ...</p>
        ) : isError ? (
          <>Error while fetching category</>
        ) : (
          <div className="text-black mt-5 font-light text-xl font-poppins">
            {Category &&
              Category?.map((cat) => (
                <button
                  key={cat._id}
                  onMouseEnter={() => {
                    setSubCat(cat.subcategory);
                    setShow(true);
                  }}
                  onMouseLeave={() => setShow(false)}
                  className="py-2 px-6 w-80 font-semibold text-gray-700"
                >
                  <div className="flex justify-between">
                    <p className="mb-3 relative">{cat.category}</p>
                    <span>
                      <BiChevronRight />
                    </span>
                  </div>
                  <hr />
                </button>
              ))}
            {show && (
              <div
                onMouseLeave={() => setShow(false)}
                onMouseEnter={() => setShow(true)}
                className="absolute -top-5 py-5 left-80 h-full bg-[#F8F8F8] rounded-r-lg text-start z-10 text-black mt-5 font-light text-xl font-poppins"
              >
                {SubCat?.map((sub) => (
                  <div key={sub._id} className="text-start">
                    <button className="py-3 px-6 w-80 font-semibold text-gray-700 block">
                      <p className="block">{sub.nameOfSub}</p>
                    </button>
                    <hr />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeCategory;