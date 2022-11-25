import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Fetch_Category } from '../../../Redux/Actions/CategoryAction';
const HomeCategory = () => {
  const dispatch = useDispatch();

  const { Category } = useSelector((state) => state.Category);
  useEffect(() => {
    dispatch(Fetch_Category());
  }, [dispatch]);
  return (
    <div className='rounded-xl bg-[#F8F8F8] hidden lg:block'>
      <div className='text-black mt-5 font-light text-xl font-poppins'>
        {Category.map((cat) => (
          <>
            <div className='py-2 px-6 w-80 font-semibold text-gray-700'>
              <p key={cat} className='mb-3' >{cat.category}</p><hr />
            </div>
          </>
        ))}
        {/* {Category.map((cat) => (
          cat.subcategory.map((child) => (
            <>
              <p className='block' key={child}>{child}</p>
            </>
          ))
        ))} */}
      </div>
    </div>
  )
}

export default HomeCategory
