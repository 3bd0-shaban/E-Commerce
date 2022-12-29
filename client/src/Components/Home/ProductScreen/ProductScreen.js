import React, { useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom';
import { Header, ProductMainScreen, HomeCategory, Reviews, Footer, HomeProducts2 } from '../../Exports'
import { useGetProductsDetailsQuery } from '../../../Redux/APIs/ProductsApi'
import { useTitle } from '../../Exports'

const ProductScreen = () => {
  const params = useParams();
  const { id } = params;
  const { data: productDetails } = useGetProductsDetailsQuery(id) || {};
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useTitle(productDetails?.name);

  const SpicHeader = () => {
    return (
      <div className='w-full py-12 bg-[#F5F5F5]'>
        <div className='text-lg xl:text-2xl font-semibold flex gap-5 xl:gap-16 text-gray-600 items-center whitespace-nowrap px-4 xl:px-32 uppercase'>
          <Link>related</Link>
          <Link>DESCRIPTION</Link>
          <Link>specification</Link>
          <Link>Reviews ( {productDetails?.numofreviews} )</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className='flex container max-w-full xl:max-w-[144rem] gap-5'>
        <HomeCategory Hight={'h-[54.5rem]'} />
        <div>
          <ProductMainScreen />
          <SpicHeader />
          <Reviews id={id} />
        </div>
      </div>
      <div className='container max-w-[145rem]'>
        <div className='conatiner max-w-full xl:max-w-[144rem]'>
          <div dangerouslySetInnerHTML={{ __html: productDetails.fulldes }} />
        </div>
        <HomeProducts2 Category={'Revently Viewed'} />
      </div>
      <Footer />
    </>
  )
}

export default ProductScreen
