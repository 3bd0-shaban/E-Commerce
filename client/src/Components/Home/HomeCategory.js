import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CategoryAction } from '../../Redux/Slices/CategorySlice';
import getError from './../utile';
const HomeCategory = () => {
  const dispatch = useDispatch();

  const { Category } = useSelector((state) => state.Category)
  useEffect(() => {
    const FetchData = async () => {
      dispatch(CategoryAction.Fetch_Category_Request())
      try {
        const result = await axios.get('http://localhost:5000/api/category/get');
        dispatch(CategoryAction.Fetch_Category_Success(result.data));
      } catch (error) {
        dispatch(CategoryAction.Fetch_Category_Fails(getError(error)));
      }
    };
    FetchData();
  }, [dispatch]);
  return (
    <div className='dropdwon-content hidden container left-0 right-0 bg-white absolute top-[6.9rem] z-30 rounded-lg border'>
      <div className='text-black grid grid-cols-5 gap-4 mt-5 font-light text-xl font-poppins'>
        {Category.map((cat) => (
          <>
            <p>{cat.category}</p>
          </>
        ))}
        {Category.map((cat) => (
          cat.subcategory.map((child) => (
            <>
              <p className='block'>{child}</p>
            </>
          ))
        ))}
      </div>
    </div>
  )
}

export default HomeCategory
