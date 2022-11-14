import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Fetch_Category } from './../../Redux/Actions/CategoryAction';
const HomeCategory = () => {
  const dispatch = useDispatch();

  // const { Category } = useSelector((state) => state.Category);
  useEffect(() => {
    dispatch(Fetch_Category());
  }, [dispatch]);
  return (
    <div className='dropdwon-content hidden container left-0 right-0 bg-black absolute top-[6.9rem] z-30 rounded-lg border'>
      {/* <div className='text-black grid grid-cols-5 gap-4 mt-5 font-light text-xl font-poppins'>
        {Category.map((cat) => (
          <>
            <p key={cat}>{cat.category}</p>
          </>
        ))}
        {Category.map((cat) => (
          cat.subcategory.map((child) => (
            <>
              <p className='block' key={child}>{child}</p>
            </>
          ))
        ))}
      </div> */}
    </div>
  )
}

export default HomeCategory
