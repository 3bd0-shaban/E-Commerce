import React, { useEffect, useState } from 'react'
import { Danger } from '../../Alerts';
import { ShowRating } from '../../Exports'
import { Link, useParams } from 'react-router-dom'
import { useGetProductsDetailsQuery } from '../../../Redux/APIs/ProductsApi';
// import { HiOutlineTruck } from 'react-icons/hi';
import { CiHeart } from 'react-icons/ci';
import { useAddToWhitelistMutation } from '../../../Redux/APIs/WhiteListApi';
import { ToastContainer, toast } from 'react-toastify';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import { useAddToCartMutation } from '../../../Redux/APIs/CartApi';
const ProductMainScreen = () => {
    const params = useParams();
    const { id } = params;
    const product_Id = id;
    const [image, setImage] = useState('');
    const { data: productDetails, isLoading: loading, error } = useGetProductsDetailsQuery(id) || {};
    useEffect(() => {
        setImage(productDetails?.images && productDetails?.images[0].url);
    }, [setImage, productDetails]);
    const [addToWhitelist] = useAddToWhitelistMutation()
    const [addToCart] = useAddToCartMutation();

    const HandleToWhiteList = async () => {
        addToWhitelist(id).unwrap()
            .then((payload) => toast.success(payload.msg))
            .catch((error) => toast.error(error.data.msg));
    }
    const AddToCartHandler = async () => {
        await addToCart({ product_Id }).unwrap()
            .then((payload) => toast.success(payload.msg))
            .catch((error) => toast.error(error.data.msg));
    }
    return (
        <div className='container px-0 xl:px-2 max-w-[140rem] mt-5'>
            {loading ?
                <p className='mx-auto mt-20 text-3xl font-serif font-semibold'>Loading ....</p>
                : error ? <Danger error={'No Product Founded'} className={'mx-auto mt-20 text-7xl font-serif font-semibold bg-red-200 py-3 px-5'} /> : productDetails._id &&
                    <>
                        <ToastContainer position="bottom-center" closeOnClick autoClose={1200} hideProgressBar={true} limit={1} />
                        <div className='grid grid-cols-1 xl:grid-cols-5 min-h-[45rem]'>
                            <div className='xl:col-span-2 flex'>
                                <div className='w-[25%] hidden xl:block'>
                                    {productDetails &&
                                        productDetails?.images?.map((img) => (
                                            <div key={img._id} onClick={() => setImage(img.url)}><img src={img.url} className={'border w-[80%] object-cover cursor-pointer hover:border-slate-900'} alt='' /></div>
                                        ))}
                                </div>
                                <div className='flex justify-center mr-5'>
                                    <img src={image} className='h-[35rem] min-w-full mx-auto' alt='' />
                                </div>
                            </div>
                            <div className='xl:col-span-2 '>
                                <div className='flex justify-center items-center'>
                                    <p className='text-xl font-semibold py-3 '>{productDetails?.name}</p>
                                    <Link onClick={HandleToWhiteList} className='fill-black'><CiHeart style={{ fontSize: "2.5rem" }} /></Link>
                                </div>
                                <hr />
                                <div className='flex items-center gap-3'>
                                    <ShowRating Rating={productDetails?.rating} className={'!text-lg gap-1 text-[#FDD901]'} />
                                    <p>( {productDetails?.numofreviews} )</p>
                                </div>
                                <div className='text-xl leading-10'>
                                    {productDetails?.specs?.map(item => (
                                        <div className='grid grid-cols-4'>
                                            <div className='col-span-1'><li className='block'>{item.title} :</li></div>
                                            <div className='col-span-3'><li>{item.description}</li></div>
                                        </div>
                                    ))}
                                </div>
                                {/* <p className='text-xl mt-auto'>{productDetails.des}</p> */}

                                {productDetails.stock > 0 ?
                                    <div className='py-5'>
                                        <p className='mb-4 text-lg font-extralight'>Avability : <span className='font-semibold text-green-600'>In Stock</span></p>
                                        {productDetails.stock < 5 && productDetails.stock > 0 && <p className='my-3'>Only {productDetails.stock} is available</p>}
                                        <hr />
                                        {/* <div className='mt-4 py-3 bg-[#F5F5F5] flex items-center px-4 gap-3'>
                                            <div className='text-gray-500'><HiOutlineTruck /></div>
                                            <p className='text-gray-500'>Item with <span className='text-gray-700 font-serif font-semibold'>Free Dilivary</span></p>
                                        </div> */}
                                        <div className='flex gap-5'>
                                            <p className='text-3xl font-bold mt-auto text-blue-600 py-3'>$ {productDetails.price}</p>
                                            <p className='text-2xl items-center flex text-gray-500 line-through'>$ {productDetails.discountprice}</p>
                                        </div>
                                        <div className='flex items-center justify-center'>
                                            <Link onClick={AddToCartHandler} className='px-32 mt-5 text-center border-4 border-blue-500 py-4 rounded-full font-medium hover:bg-blue-500 focus:ring focus:ring-blue-600 hover:text-white'>Add to Card</Link>
                                        </div>
                                    </div>
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
