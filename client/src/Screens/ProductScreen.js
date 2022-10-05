import React, { useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Reducer from '../Redux/Reducer'
import { useParams } from 'react-router-dom';
import { Comments, Header, Rating, getError } from '../Exports'
import { Helmet } from 'react-helmet-async';
import { Danger } from '../Components/Alerts';
// import  data  from '../data';

const ProductScreen = () => {
  const params = useParams();
  const { id } = params;
  const [{ loading, error, products }, dispatch] = useReducer(Reducer, {
    products: [],
    loading: true,
    error: ''
  })
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      dispatch({ type: 'Fetch_Data' })
      try {
        const result = await axios.get(`http://localhost:5000/api/products/${id}`);
        dispatch({ type: 'Success_Fetch', payload: result.data });
      } catch (error) {
        dispatch({ type: 'Fail_Fetch', payload: getError(error) })
      }
    };
    FetchData();
  }, [id])

  return (
    <>
      <Header />
      <div className='container max-w-5xl mt-5'>
        {loading ?
          <p className='mx-auto mt-20 text-3xl font-serif font-semibold'>Loading ....</p>
          : error ? <Danger error={error} /> : (
            <>
              <div className='h-96 grid grid-cols-1 md:grid-cols-3'>
                <Helmet>
                  <title>{products.name}</title>
                </Helmet>
                <div className='col-span-2 '>
                  <img src={products.image} className=' object-cover w-full mx-auto md:w-1/2' alt='' />
                </div>
                <div className=''>
                  <p className='text-xl font-semibold'>{products.name}</p>
                  {products.quentity > 0 ?
                    <>
                      <p className='text-xl mt-auto'>{products.price}$</p>
                      <Rating rating={`${products.rating}`} />
                      <div className=' mb-3 flex gap-4 mt-5'>
                        <Link className='border border-orange-300 px-4 py-2 rounded-2xl font-medium hover:bg-orange-300 focus:ring focus:ring-orange-200 hover:text-white'>Card</Link>
                        <Link className='border border-orange-300 px-4 py-2 rounded-2xl font-medium hover:bg-orange-300 focus:ring focus:ring-orange-200 hover:text-white'>Favorite</Link>
                      </div>
                      <p>In Stock</p>
                    </>
                    :
                    <p>Out Of Stock</p>
                  }
                  {products.quentity < 5 && products.quentity > 0 && <p>Only {products.quentity} is available</p>}
                </div>
              </div>
              <Comments />
            </>
          )}
      </div>
    </>
  )
}

export default ProductScreen
