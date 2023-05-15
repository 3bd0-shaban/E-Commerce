'use client';
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai'
import { MdShoppingBag } from 'react-icons/md'
import { useGetProductsQuery } from '@Redux/APIs/ProductsApi'
import { useAddToWhitelistMutation } from '@Redux/APIs/WhiteListApi';
import { toast } from 'react-toastify';
import { useAddToCartMutation } from '@Redux/APIs/CartApi';
import { Swiper, useSwiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import GetError from '@lib/GetError';
import Link from 'next/link';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import SKHomeProducts from '@Skiliton/SKHomeProducts';

interface HomeCategoryProps {
    Category?: string;
}
export default function HomeProducts({ Category }: HomeCategoryProps) {

    const { data, isLoading: loading, isError, error } = useGetProductsQuery({ page: 1 });
    const { products } = data || {};
    const [addToWhitelist] = useAddToWhitelistMutation();
    const [addToCart] = useAddToCartMutation();

    const HandleToWhiteList = async (product_Id: string) => {
        await addToWhitelist(product_Id).unwrap()
            .then((payload) => toast.success(payload.message))
            .catch((error) => toast.error(error.data.message));
    }
    const AddToCartHandler = async (productId: string) => {
        await addToCart({ productId }).unwrap()
            .then((payload) => toast.success(payload.message))  
            .catch((error) => toast.error(error.data.message));
    }
    const SwiperButtons = () => {
        const swiper = useSwiper();
        return <div className='flex justify-end items-center'>
            <button onClick={() => swiper.slideNext()}><BiChevronLeft size={25} /></button>
            <button onClick={() => swiper.slidePrev()}><BiChevronRight size={25} /></button>
        </div>
    };
    return (
        <div className='py-4 relative'>
            <div className='flex items-center mb-5 gap-3'>
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
                : isError &&
                <GetError error={error} danger={true} />
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
                    1400: {
                        slidesPerView: 6,
                    },
                }}
                speed={500}
                loop={true}
                autoplay={true}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="productsswiper1 flex-col-reverse !flex"
            >
                <SwiperButtons />
                {/* <PaginationElement /> */}
                {products?.map((product) => (
                    <SwiperSlide key={product._id} className=' product px-3 select-none'>
                        <div className='mt-2'>
                            <div className=' flex items-center relative overflow-hidden justify-center w-[85%] mx-auto'>
                                <Link draggable={false} href={`/product/${product._id}`}>
                                    <Image
                                        height={200}
                                        width={200}
                                        draggable={false}
                                        src={product.images[0]?.url}
                                        className='rounded-2xl max-h-44 object-cover mx-auto'
                                        alt={product?.name}
                                    />
                                </Link>
                                {(product?.stock ?? 0 > 0) &&
                                    <div className='-bottom-20 inset-x-0 hover:block max-h-full absolute text-white items'>
                                        <div className='flex justify-center gap-4'>
                                            <button aria-label='add to cart'
                                                onClick={() => AddToCartHandler(product?._id as string)}
                                                className='rounded-full flex items-center font-medium text-orange-300
                                                     hover:text-white p-2 text-xl border border-orange-300 
                                                     hover:bg-orange-300 focus:ring focus:ring-orange-200'>
                                                <MdShoppingBag />
                                            </button>
                                            <button
                                                aria-label='add to white list'
                                                onClick={() => HandleToWhiteList(product._id as string)}
                                                className='rounded-full flex items-center font-medium text-orange-300
                                                     hover:text-white p-2 text-xl border border-orange-300
                                                      hover:bg-orange-300 focus:ring focus:ring-orange-200'>
                                                <AiOutlineHeart />
                                            </button>
                                        </div>
                                        <p className='text-sm mt-3 mx-auto'>{product.rating}</p>
                                    </div>
                                }
                                <div className='-left-10 hover:block max-h-full absolute text-white watchitem'>
                                    <Link
                                        draggable={false}
                                        href={`/product/${product._id}`}
                                        className='rounded-full flex items-center font-medium text-orange-300
                                         hover:text-white p-2 text-xl border border-orange-300
                                          hover:bg-orange-300 focus:ring focus:ring-orange-200'>
                                        <AiOutlineEye />
                                    </Link>
                                </div>

                            </div>
                            {(product?.stock ?? 0 > 0) ?
                                <>
                                    <div className='mt-5 text-center '>
                                        <Link
                                            draggable={false}
                                            href={`/product/${product._id}`}
                                            className='text-sm hover:text-orange-300 font-medium ellipse-2'>
                                            {product.name}
                                        </Link>
                                        <p className='text-xl mt-4 font-semibold text-cyan-600'>
                                            {product.price}$
                                        </p>
                                    </div>
                                </>
                                : <p>Out of Stack</p>
                            }
                        </div>
                    </SwiperSlide>
                )
                )}
            </Swiper>
        </div>
    )
}
