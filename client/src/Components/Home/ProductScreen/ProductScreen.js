import React, { useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom';
import { Header, ProductMainScreen, HomeCategory, Reviews, Footer, HomeProducts2 } from '../../Exports'
import { AnimRoutes } from '../../../Animation/Exports'
import { useGetProductsDetailsQuery } from '../../../Redux/APIs/ProductsApi'
import { useTitle } from '../../Exports'
import { motion } from 'framer-motion';

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
      <div className='w-full my-5 py-12 bg-[#F5F5F5]'>
        <div className='text-lg xl:text-2xl font-semibold flex gap-5 xl:gap-16 text-gray-600 items-center whitespace-nowrap px-4 xl:px-32 uppercase'>
          <Link draggable={false}>related</Link>
          <Link draggable={false}>DESCRIPTION</Link>
          <Link draggable={false}>specification</Link>
          <Link draggable={false}>Reviews ( {productDetails?.numofreviews} )</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <motion.div variants={AnimRoutes}
        initial="initial"
        animate="shown"
        exit="exit" className='flex container max-w-full select-none xl:max-w-[120rem] gap-5'>
        <HomeCategory Hight={'h-[54.5rem]'} />
        <div>
          <ProductMainScreen />
          <SpicHeader />
          <div className='conatiner max-w-full my-7' dangerouslySetInnerHTML={{ __html: productDetails?.fulldes }} />
          <Reviews id={id} />
        </div>
      </motion.div>
      <div className='container max-w-[120rem]'>
        <div className='conatiner max-w-full xl:max-w-[120rem]'>
        </div>
        <HomeProducts2 Category={'Revently Viewed'} />
      </div>
      <Footer />
    </>
  )
}

export default ProductScreen
