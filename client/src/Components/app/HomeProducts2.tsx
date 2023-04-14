'use client';
import React from 'react'
import { useGetProductsQuery } from '@Redux/APIs/ProductsApi'
import { Swiper, SwiperSlide } from "swiper/react";
import SKHomeProducts from "@Skiliton/SKHomeProducts";
import Link from 'next/link';
import GetError from '@lib/GetError';

import "swiper/css/pagination";
import "swiper/css";
import ShowRating from '@Components/Layouts/ShowRating';
import Image from 'next/image';


interface HomeCategoryProps {
    Category?: string;
}

const HomeProducts2 = ({ Category }: HomeCategoryProps) => {
    const { data: products, isLoading: loading, error } = useGetProductsQuery({ numpage: 1 }) || {};
    return (
        <>
            <div className='flex items-center mt-16 gap-3'>
                <label className='lg:text-3xl whitespace-nowrap font-medium text-gray-800'>{Category}</label>
                <hr className='w-full bg-gray-300'></hr>
            </div>
            {loading ?
                <div className='flex gap-2'>
                    <SKHomeProducts />
                    <SKHomeProducts />
                    <SKHomeProducts />
                    <SKHomeProducts />
                    <SKHomeProducts />
                    <SKHomeProducts />
                    <SKHomeProducts />
                </div>
                : error &&
                <GetError error={error} danger />
            }
            <Swiper
                slidesPerView={2}
                breakpoints={{
                    567: {
                        slidesPerView: 3,

                    },
                    768: {
                        slidesPerView: 4,
                    },
                    992: {
                        slidesPerView: 4,
                    },
                    1600: {
                        slidesPerView: 6,
                    },
                }}>
                {products
                    && products?.map((product) => (
                        <SwiperSlide key={product._id} className=' product px-3 select-none'>
                            <div className='py-5'>
                                <div className='grid grid-cols-3 items-center relative overflow-hidden justify-center mx-auto'>
                                    <Link draggable={false}
                                        href={`/product/${product._id}`}>
                                        <Image
                                            height={500}
                                            width={500}
                                            draggable={false}
                                            src={product.images ? product.images[0].url : 'Can not load images'}
                                            className='rounded-2xl p-1 object-contain h-32 mx-auto' alt={product.name}
                                        />
                                    </Link>
                                    {(product.stock ?? 0 > 0) &&
                                        <>
                                            <div className='block col-span-2'>
                                                <Link
                                                    draggable={false}
                                                    href={`/product/${product._id}`} className='text-xl hover:text-orange-300 font-semibold ellipse-2'>
                                                    {product.name}
                                                </Link>
                                                <p className='text-xl mt-4 font-semibold text-cyan-600'>
                                                    {product.price}$
                                                </p>
                                                <div className='flex items-center gap-3'>
                                                    <ShowRating
                                                        Rating={product.rating ?? 0}
                                                        className={'!text-lg gap-1 text-[#FDD901]'}
                                                    />
                                                    <p>( {product.numofreviews} )</p>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                    )}
            </Swiper>
        </>
    )
}
export default HomeProducts2