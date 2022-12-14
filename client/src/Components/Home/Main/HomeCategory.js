import React from 'react'
import { useGetCategoryQuery } from '../../../Redux/APIs/CategoryApi';
const HomeCategory = (props) => {
  const { data: Category, isFetching, isError } = useGetCategoryQuery();

  return (
    <div className={`rounded-xl bg-[#F8F8F8] hidden lg:block ${props.Hight}`}>
      {isFetching ? <p>Featvhing</p> : isError ? <>Error while fetching category</> :
        <div className='text-black mt-5 font-light text-xl font-poppins'>
          {Category &&
            Category?.map((cat) => (
              <div key={cat._id} className='py-2 px-6 w-80 font-semibold text-gray-700'>
                <p className='mb-3' >{cat.category}</p><hr />
              </div>
            ))}
        </div>}
    </div>
  )
}

export default HomeCategory


          /* {Category.map((cat) => (
cat.subcategory.map((child) => (
  <>
    <p className='block' key={child}>{child}</p>
  </>
))
))} */