import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai'
import { MdShoppingBag } from 'react-icons/md'
import { SKHomeProducts } from '../../Exports';
import { Danger } from '../../Alerts';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useGetProductsQuery } from '../../../Redux/APIs/ProductsApi'
import { useAddToWhitelistMutation } from '../../../Redux/APIs/WhiteListApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddToCartMutation } from '../../../Redux/APIs/CartApi';
const HomeProducts = (props) => {
    const [id, setId] = useState('');
    const product_Id = id;
    const { data: products, isLoading: loading,isError, error } = useGetProductsQuery() || {};
    const [addToWhitelist] = useAddToWhitelistMutation();
    const [addToCart] = useAddToCartMutation();
    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    autoplay: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 2,
                    autoplay: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 567,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    autoplay: false,
                    arrows: false,
                }
            }
        ]
    };
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
        <>
            <ToastContainer position="bottom-center" closeOnClick autoClose={1200} hideProgressBar={true} limit={1} />
            <div className='flex items-center mt-10 mb-5 gap-3'>
                <label className='lg:text-3xl whitespace-nowrap font-medium text-gray-800'>{props.Category}</label>
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
                <Danger error={error?.data?.msg || 'Can not load products'}/>
            }
            <Slider {...settings}>
                {products &&
                    products?.map((product) => (
                        <div key={product._id} className=' product px-3'>
                            <div className='mt-2'>
                                <div className=' flex items-center relative overflow-hidden justify-center w-[85%] mx-auto'>
                                    <Link to={`/product/${product._id}`}><img src={product.images ? product.images[0].url : 'Can not load images'} className='rounded-2xl max-h-44 object-cover mx-auto' alt={product.name}></img></Link>
                                    {product.stock > 0 &&
                                        <div className='-bottom-20 inset-x-0 hover:block max-h-full absolute text-white items'>
                                            <div className='flex justify-center gap-4'>
                                                <Link onClick={() => { setId(product._id); AddToCartHandler() }}
                                                    className='rounded-full flex items-center font-medium text-orange-300 hover:text-white p-2 text-xl border border-orange-300 hover:bg-orange-300 focus:ring focus:ring-orange-200'><MdShoppingBag /></Link>
                                                <Link onClick={() => { setId(product._id); HandleToWhiteList() }}
                                                    className='rounded-full flex items-center font-medium text-orange-300 hover:text-white p-2 text-xl border border-orange-300 hover:bg-orange-300 focus:ring focus:ring-orange-200'><AiOutlineHeart /></Link>
                                            </div>
                                            <p className='text-sm mt-3 mx-auto'>{product.rating}</p>
                                        </div>
                                    }
                                    <div className='-left-10 hover:block max-h-full absolute text-white watchitem'>
                                        <Link to={`/product/${product._id}`} className='rounded-full flex items-center font-medium text-orange-300 hover:text-white p-2 text-xl border border-orange-300 hover:bg-orange-300 focus:ring focus:ring-orange-200'>
                                            <AiOutlineEye />
                                        </Link>
                                    </div>

                                </div>
                                {product.stock > 0 ?
                                    <>
                                        <div className='mt-5 text-center '>
                                            <Link to={`/product/${product._id}`} className='text-xl hover:text-orange-300 font-semibold ellipse-2'>{product.name}</Link>
                                            <p className='text-xl mt-4 font-semibold text-cyan-600'>{product.price}$</p>
                                        </div>
                                    </>
                                    : <p>Out of Stack</p>
                                }
                            </div>
                        </div>
                    )
                    )}
            </Slider>
        </>
    )
}
export default HomeProducts