'use client';
import React, { useEffect, useState } from 'react'
import { useGetProductsDetailsQuery } from '@Redux/APIs/ProductsApi';
// import { HiOutlineTruck } from 'react-icons/hi';
import { CiHeart } from 'react-icons/ci';
import { useAddToWhitelistMutation } from '@Redux/APIs/WhiteListApi';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useAddToCartMutation } from '@Redux/APIs/CartApi';
import { useParams } from 'next/navigation';
import GetError from '@lib/GetError';
import Link from 'next/link';
import ShowRating from '@Components/Layouts/ShowRating';
import Image from 'next/image';
const UpperProductDetails = () => {
    const { productId } = useParams();
    const [image, setImage] = useState('');
    const { data: productDetails, isLoading: loading, error } = useGetProductsDetailsQuery({ productId }) || {};
    useEffect(() => {
        setImage(productDetails?.images && productDetails?.images[0].url);
    }, [setImage, productDetails]);

    const [addToWhitelist] = useAddToWhitelistMutation()
    const [addToCart] = useAddToCartMutation();

    const HandleToWhiteList = async () => {
        addToWhitelist({ productId }).unwrap()
            .then((payload) => toast.success(payload.msg))
            .catch((error) => toast.error(error.data.msg));
    }
    const AddToCartHandler = async () => {
        await addToCart({ productId }).unwrap()
            .then((payload) => toast.success(payload.msg))
            .catch((error) => toast.error(error.data.msg));
    }
    return (
        <div className='container px-0 xl:px-2 max-w-[120rem] select-none mt-5'>
            {loading ?
                <p className='mx-auto mt-20 text-3xl font-serif font-semibold'>Loading ....</p>
                : error ?
                    <GetError error={error} danger /> :
                    productDetails._id &&
                    <>
                        <div className='grid grid-cols-1 xl:grid-cols-5 min-h-[45rem]'>
                            <div className='xl:col-span-2 flex'>
                                <div className='w-[25%] hidden xl:block'>
                                    {productDetails &&
                                        productDetails?.images?.map((img) => (
                                            <div key={img._id}
                                                onClick={() => setImage(img.url)}>
                                                <Image
                                                    height={500}
                                                    width={500}
                                                    draggable={false}
                                                    src={img.url}
                                                    className={'border w-[80%] object-cover cursor-pointer hover:border-slate-900'}
                                                    alt='' />
                                            </div>
                                        ))}
                                </div>
                                <div className='flex justify-center mr-5'>
                                    <Image
                                        height={500}
                                        width={500} draggable={false} src={image} className='h-[35rem] min-w-full mx-auto' alt='' />
                                </div>
                            </div>
                            <div className='xl:col-span-2 '>
                                <div className='flex justify-between items-start'>
                                    <p className='text-xl font-semibold py-3 '>{productDetails?.name}</p>
                                    <Link
                                        href='/'
                                        draggable={false}
                                        onClick={HandleToWhiteList}
                                        className='fill-black'>
                                        <CiHeart style={{ fontSize: "2.5rem" }} />
                                    </Link>
                                </div>
                                <hr />
                                <div className='flex items-center gap-3'>
                                    <ShowRating Rating={productDetails?.rating ?? 0} className={'!text-lg gap-1 text-[#FDD901]'} />
                                    <p>( {productDetails?.numofreviews} )</p>
                                </div>
                                <div className='text-xl leading-10'>
                                    {productDetails?.specs?.map(item => (
                                        <div key={item._id} className='grid grid-cols-4'>
                                            <div className='col-span-1'><li className='block'>{item.title} :</li></div>
                                            <div className='col-span-3'><li>{item.description}</li></div>
                                        </div>
                                    ))}
                                </div>
                                {/* <p className='text-xl mt-auto'>{productDetails.des}</p> */}

                                {(productDetails.stock ?? 0 > 0) ?
                                    <div className='py-5'>
                                        <p className='mb-4 text-lg font-extralight'>
                                            Avability :
                                            <span className='font-semibold text-green-600'>In Stock</span>
                                        </p>
                                        {(productDetails.stock < 5) &&
                                            <p className='my-3'>
                                                Only {productDetails.stock} is available
                                            </p>
                                        }
                                        <hr />
                                        <div className='flex gap-5'>
                                            <p className='text-3xl font-bold mt-auto text-blue-600 py-3'>$ {productDetails.price}</p>
                                            <p className='text-2xl items-center flex text-gray-500 line-through'>$ {productDetails.discountprice}</p>
                                        </div>
                                        <div className='flex items-center justify-center'>
                                            <Link
                                                href='/'
                                                draggable={false}
                                                onClick={AddToCartHandler}
                                                className='px-32 mt-5 text-center border-4 border-blue-500 py-4 rounded-full 
                                                font-medium hover:bg-blue-500 focus:ring focus:ring-blue-600 hover:text-white'>
                                                Add to Card
                                            </Link>
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

export default UpperProductDetails
