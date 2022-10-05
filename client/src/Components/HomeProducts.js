import React, { useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Reducer from '../Redux/Reducer'
import { Helmet } from 'react-helmet-async';
const HomeProducts = () => {// eslint-disable-next-line
    const [{ loading, error, products }, dispatch] = useReducer(Reducer, {
        products: [],
        loading: true,
        error: ''
    })
    useEffect(() => {
        const FetchData = async () => {
            dispatch({ type: 'Fetch_Data' })
            try {
                const result = await axios.get('http://localhost:5000/api/products');
                dispatch({ type: 'Success_Fetch', payload: result.data });
            } catch (error) {
                dispatch({ type: 'Fail_Fetch', payload: error.message })
            }
        };
        FetchData();
    }, [])
    const addtocart = () => {
        const current = localStorage.getItem('cart');
        const cart = current + 1
        localStorage.setItem('cart', cart)
    }
    return (
        <div className='container max-w-7xl mt-5'>
            {loading ?
                <div className='grid grid-cols-4 gap-3'>
                    <div className="space-y-8 animate-pulse border p-2">
                        <div className="flex justify-center items-center w-full h-48 bg-gray-300 rounded">
                            <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"></path></svg>
                        </div>
                        <div className="w-full">
                            <div className="h-5 bg-gray-200 rounded-full w-48 mb-4"></div>
                            <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                : error ? <p>error</p> : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                        <Helmet>
                            <title>{products.name}</title>
                        </Helmet>
                        {products.map((product) =>
                            <Link to={`/product/${product.id}`} className='relative border px-3 shadow hover:shadow-md' key={product.id}>
                                <img src={product.image} className='h-1/2 object-cover mx-auto' alt='' />
                                <div className=''>
                                    {product.quentity > 0 ?
                                        <>
                                            <div className='flex justify-between'>
                                                <p className='text-xl font-semibold'>{product.name}</p>
                                                <p className='text-xl mt-auto'>{product.price}$</p>
                                            </div>
                                            <div className='block'>
                                                <p className='text-sm mt-3'>{product.rating}</p>
                                            </div>
                                            <div className='absolute bottom-0 mb-3 flex gap-4 '>
                                                <Link onClick={addtocart} className='pointer-events-auto border border-orange-300 px-4 py-2 rounded-2xl font-medium hover:bg-orange-300 focus:ring focus:ring-orange-200'>Card</Link>
                                                <Link className='border border-orange-300 px-4 py-2 rounded-2xl font-medium hover:bg-orange-300 focus:ring focus:ring-orange-200'>Favorite</Link>
                                            </div>
                                        </>
                                        : <p>Out of Stack</p>
                                    }
                                </div>
                            </Link>
                        )}
                    </div>
                )}
        </div>
    )
}

export default HomeProducts
