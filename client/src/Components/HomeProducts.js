import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BsImages } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { ProductsAction } from '../Redux/Slices/ProductSlice'
import { Helmet } from 'react-helmet-async';
import getError from './../utile';
const HomeProducts = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);
    useEffect(() => {
        const FetchData = async () => {
            dispatch(ProductsAction.Fetch_Data())
            try {
                const result = await axios.get('http://localhost:5000/api/products');
                dispatch(ProductsAction.Success_Fetch(result.data));
            } catch (error) {
                dispatch(ProductsAction.Fail_Fetch(getError(error)));
            }
        };
        FetchData();
    }, [dispatch]);
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
                            <BsImages style={{ fontSize: '50px', color: '#99999B' }} />
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
                            <title>{'e-commerce'}</title>
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
