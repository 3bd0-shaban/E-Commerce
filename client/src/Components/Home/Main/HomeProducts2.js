import React from 'react'
import { Link } from 'react-router-dom';
import { SKHomeProducts, ShowRating } from '../../Exports';
import { Danger } from '../../Alerts';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useGetProductsQuery } from '../../../Redux/APIs/ProductsApi'
const HomeProducts2 = (props) => {
    const { data: products, isLoading: loading, error } = useGetProductsQuery() || {};

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        customPaging: i => (
            <div className='bg-gray-400 rounded-full w-2 h-2'></div>
        ),
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
    return (
        <>
            <div className='flex items-center mt-16 gap-3'>
                <label className='lg:text-3xl  whitespace-nowrap font-medium text-gray-800'>{props.Category}</label>
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
                <Danger />
            }
            <Slider {...settings}>
                {products
                    && products?.map((product) => (
                        <div key={product._id} className=' product px-3'>
                            <div className='py-5'>
                                <div className='flex items-center relative overflow-hidden justify-center mx-auto'>
                                    <Link to={`/product/${product._id}`}><img src={product.images ? product.images[0].url : 'Can not load images'} className='rounded-2xl object-contain h-32 w-96 mx-auto' alt={product.name}></img></Link>
                                    {product.stock > 0 &&
                                        <>
                                            <div className='block'>
                                                <Link to={`/product/${product._id}`} className='text-xl hover:text-orange-300 font-semibold ellipse-2'>{product.name}</Link>
                                                <p className='text-xl mt-4 font-semibold text-cyan-600'>{product.price}$</p>
                                                <div className='flex items-center gap-3'>
                                                    <ShowRating Rating={product.rating} className={'!text-lg gap-1 text-[#FDD901]'} />
                                                    <p>( {product.numofreviews} )</p>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                    )}
            </Slider>
        </>
    )
}
export default HomeProducts2