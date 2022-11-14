import React, { useEffect } from 'react'
import { Danger } from '../../Alerts';
import { Comments, Rating } from '../../Exports'
import { Link, useParams } from 'react-router-dom'
import { Add_to_cart } from '../../../Redux/Actions/CartAction';
import { useSelector, useDispatch } from 'react-redux'
import { Fetch_Product_Details } from '../../../Redux/Actions/ProductsAction';
import { HiOutlineTruck } from 'react-icons/hi'
import { CiHeart } from 'react-icons/ci'

const ProductMainScreen = () => {
    const { loading, error, productDetails } = useSelector((state) => state.products);
    // const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        dispatch(Fetch_Product_Details(id))
    }, [dispatch, id]);

    const AddtoCart = async () => {
        const product_Id = id
        dispatch(Add_to_cart(product_Id));
    }

    return (
        <div className='container max-w-[140rem] mt-5'>
            {loading ?
                <p className='mx-auto mt-20 text-3xl font-serif font-semibold'>Loading ....</p>
                : error ? <Danger error={'No Product Founded'} className={'mx-auto mt-20 text-7xl font-serif font-semibold bg-red-200 py-3 px-5'} /> : productDetails._id &&
                    <>
                        <div className='grid grid-cols-1 md:grid-cols-5 h-[45rem]'>
                            <div className='col-span-2 flex'>
                                <div className='w-[25%]'>
                                    {productDetails.images?.map((img) => (
                                        <img src={img.url} className='border w-[80%] object-cover' alt='' />
                                    ))}
                                </div>
                                <div className=''>
                                    <img src={productDetails.images ? productDetails.images[0].url : 'Can not load images'} className='object-cover w-full mx-auto' alt='' />
                                </div>
                            </div>
                            <div className='col-span-2 px-10'>
                                <div className='flex justify-center items-center'>
                                    <p className='text-xl font-semibold py-3 '>{productDetails.name}</p>
                                    <Link className='fill-black'><CiHeart style={{ fontSize: "2.5rem" }} /></Link>
                                </div>
                                <hr />
                                <div className='my-5'>
                                    <Rating rating={`${productDetails.rating}`} />
                                </div>
                                <div className='text-xl leading-10'>
                                    <li>High-precision lens provides a clearer picture and a better view for D</li>
                                    <li>55" class screen full array LED TV</li>
                                    <li>55" class screen full array LED TV</li>
                                    <li>55" class screen full array LED TV</li>
                                    <li>55" class screen full array LED TV</li>
                                </div>
                                {/* <p className='text-xl mt-auto'>{productDetails.des}</p> */}


                            </div>
                            <div dat-aos='flip-left' className='px-10 border-l'>
                                {productDetails.stock > 0 ?
                                    <>
                                        <p className='text-lg font-extralight'>Avability : <span className='font-semibold text-green-600'>In Stock</span></p>
                                        {productDetails.stock < 5 && productDetails.stock > 0 && <p>Only {productDetails.stock} is available</p>}
                                        <hr />
                                        <div className='py-3 bg-[#F5F5F5] flex items-center px-4 gap-3 mt-2'>
                                            <div className='text-gray-500'><HiOutlineTruck /></div>
                                            <p className='text-gray-500'>Item with <span className='text-gray-700 font-serif font-semibold'>Free Dilivary</span></p>
                                        </div>
                                        <div>
                                            <p className='text-2xl mt-auto text-gray-500 line-through'>$ {productDetails.price}</p>
                                            <p className='text-3xl font-bold mt-auto text-blue-600 py-3'>$ {productDetails.price}</p>
                                        </div>
                                        <div>
                                            <Link onClick={AddtoCart} className='border w-[80%] border-orange-300 px-4 py-2 rounded-2xl font-medium hover:bg-orange-300 focus:ring focus:ring-orange-200 hover:text-white'>Add to Card</Link>

                                        </div>

                                    </>
                                    :
                                    <p>Out Of Stock</p>
                                }
                            </div>
                        </div>
                        
                    </>
            }
        </div>
    )
}

export default ProductMainScreen
