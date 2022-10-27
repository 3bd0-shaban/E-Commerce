import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { ProductsAction } from '../../Redux/Slices/ProductSlice'
import { Helmet } from 'react-helmet-async';
import getError from './../../utile';
import { SKHomeProducts,Banners } from '../../Exports'
import { Danger } from './../Alerts'
const HomeProducts = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        const FetchData = async () => {
            dispatch(ProductsAction.Fetch_Data())
            try {
                const result = await axios.get('http://localhost:5000/api/upload/fetch_products');
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
    

    const ScrollableCategory = (props) => {
        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 5
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
            }
        };
        return (
            <>
                <p className='text-3xl font-serif font-light mb-3 uppercase'>{props.Category}</p>
                <hr className='mt-4 h-[2px] bg-gray-200 rounded' />
                <div className='hideScrollBare flex overflow-x-auto gap-4 snap-x scroll-smooth h-[32rem]' id='scroll'>
                    {/* <Carousel responsive={responsive}> */}
                    {products.map((product) =>

                        <Link to={`/product/${product._id}`} key={product._id} className=' mt-5 rounded-2xl flex-[0_0_auto] w-[48%] sm:w-[32%] md:w-[24%] lg:w-[18.6%] xl:w-[18.9%]  xxl:w-[15.8%] xxxl:w-[15.8%] snap-center'>
                            <div className='h-[50%] flex items-center'>
                                <img src={product.image.url} className='rounded-2xl scroll-ml-0 ' alt={product.name}></img>
                            </div>
                            {product.stock > 0 ?
                                <div className='mt-5 text-center'>
                                    <p className='text-xl font-semibold'>{product.name}</p>
                                    <p className='text-xl mt-auto'>{product.price}$</p>
                                    <div className=' bottom-0 mb-3 flex gap-4 '>
                                        {/* <p className='text-sm mt-3'>{product.rating}</p> */}
                                        <Link onClick={addtocart} className='pointer-events-auto border border-orange-300 px-4 py-2 rounded-2xl font-medium hover:bg-orange-300 focus:ring focus:ring-orange-200'>Card</Link>
                                        <Link className='border border-orange-300 px-4 py-2 rounded-2xl font-medium hover:bg-orange-300 focus:ring focus:ring-orange-200'>Favorite</Link>
                                    </div>
                                </div>
                                : <p>Out of Stack</p>
                            }
                        </Link>
                    )}
                    {/* </Carousel> */}
                </div>
            </>
        )
    }
    return (
        <>
            <Banners />
            <div className='container max-w-8xl mt-5'>
                <ScrollableCategory Category={'Best Offers'} />
                <ScrollableCategory Category={'Monitors'} />
                <ScrollableCategory Category={'Laptops'} />
                <ScrollableCategory Category={'Storage'} />

                {loading ?
                    <SKHomeProducts />

                    :
                    error ? <Danger error={error} className={'mx-auto mt-5 text-lg text-gray-700 font-serif font-semibold bg-red-200 py-3 px-5'} />
                        : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                                <Helmet>
                                    <title>{'e-commerce'}</title>
                                </Helmet>
                                {products.map((product) =>
                                    <Link to={`/product/${product._id}`} className='relative border px-3 shadow hover:shadow-md' key={product._id}>
                                        <img src={product.image.url} className='h-1/2 object-cover mx-auto' alt={product.name} />
                                        <div className=''>
                                            {product.stock > 0 ?
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
        </>
    )
}

export default HomeProducts
