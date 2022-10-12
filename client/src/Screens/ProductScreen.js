import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { ProductsAction } from '../Redux/Slices/ProductSlice'
import { useParams } from 'react-router-dom';
import { Comments, Header, Rating, getError } from '../Exports'
import { Helmet } from 'react-helmet-async';
import { Danger } from '../Components/Alerts';
const ProductScreen = () => {
  const { loading, error, productDetails } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const FetchData = async () => {
        dispatch(ProductsAction.Fetch_DataDetails())
        try {
            const result = await axios.get(`http://localhost:5000/api/upload/fetch_produtddetails/${id}`);
            dispatch(ProductsAction.Success_FetchDetails(result.data));
        } catch (error) {
            dispatch(ProductsAction.Fail_Fetch(getError(error)));
        }
    };
    FetchData();
}, [dispatch,id]);

  return (
    <>
      <Header />
      <div className='container max-w-5xl mt-5'>
        {loading ?
          <p className='mx-auto mt-20 text-3xl font-serif font-semibold'>Loading ....</p>
          : error ? <Danger error={'No Product Founded'} className={'mx-auto mt-20 text-7xl font-serif font-semibold bg-red-200 py-3 px-5'}/> : 
            <>
              <div className='h-96 grid grid-cols-1 md:grid-cols-3'>
                <Helmet>
                  <title>{productDetails.name}</title>
                </Helmet>
                <div className='col-span-2 '>
                  <img src={productDetails.image} className=' object-cover w-full mx-auto md:w-1/2' alt='' />
                </div>
                <div className=''>
                  <p className='text-xl font-semibold'>{productDetails.name}</p>
                  {productDetails.quentity > 0 ?
                    <>
                      <p className='text-xl mt-auto'>{productDetails.price}$</p>
                      <Rating rating={`${productDetails.rating}`} />
                      <div className=' mb-3 flex gap-4 mt-5'>
                        <Link className='border border-orange-300 px-4 py-2 rounded-2xl font-medium hover:bg-orange-300 focus:ring focus:ring-orange-200 hover:text-white'>Card</Link>
                        <Link className='border border-orange-300 px-4 py-2 rounded-2xl font-medium hover:bg-orange-300 focus:ring focus:ring-orange-200 hover:text-white'>Favorite</Link>
                      </div>
                      <p>In Stock</p>
                    </>
                    :
                    <p>Out Of Stock</p>
                  }
                  {productDetails.quentity < 5 && productDetails.quentity > 0 && <p>Only {productDetails.quentity} is available</p>}
                </div>
              </div>
              <Comments />
            </>
          }
      </div>
    </>
  )
}

export default ProductScreen
