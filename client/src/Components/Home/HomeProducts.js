import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { ProductsAction } from '../../Redux/Slices/ProductSlice'
import { Helmet } from 'react-helmet-async';
import getError from './../../utile';
import { SKHomeProducts, Banners } from '../../Exports';
import { Danger } from './../Alerts';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const HomeProducts = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        const FetchData = async () => {
            dispatch(ProductsAction.Fetch_Products_Request())
            try {
                const result = await axios.get('http://localhost:5000/api/upload/fetch_products');
                dispatch(ProductsAction.Fetch_Products_Success(result.data));
            } catch (error) {
                dispatch(ProductsAction.Fetch_Products_Fails(getError(error)));
            }
        };
        FetchData();
    }, [dispatch]);
    const addtocart = () => {
        const current = localStorage.getItem('cart');
        const cart = current + 1
        localStorage.setItem('cart', cart)
    }

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
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 567,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };
    const ScrollableCategory = (props) => {

        return (
            <>
                <p className='text-3xl font-serif font-light mb-3 uppercase'>{props.Category}</p>
                <hr className='mt-4 h-[2px] bg-gray-200 rounded' />
                <div>
                    <h2> Multiple items </h2>
                    {
                        loading ?
                            <div className='flex gap-2'>
                                <SKHomeProducts />
                                <SKHomeProducts />
                                <SKHomeProducts />
                                <SKHomeProducts />
                                <SKHomeProducts />
                                <SKHomeProducts />
                                <SKHomeProducts />
                            </div> :

                            <Slider {...settings}>
                                {
                                    products.map((product) => (
                                        <Link to={`/product/${product._id}`} key={product._id} >
                                            <div className='h-72 flex items-center'>
                                                <img src={product.image.url} className='rounded-2xl object-cover h-full relative' alt={product.name}></img>
                                            </div>
                                            {product.stock > 0 ?
                                                <>
                                                    <div className='mt-5 text-center'>
                                                        <p className='text-xl font-semibold'>{product.name}</p>
                                                        <p className='text-xl mt-auto'>{product.price}$</p>

                                                    </div>
                                                    <div className='bottom-0 mb-44 absolute text-white'>
                                                        <div className='flex justify-center gap-4'>
                                                            <Link onClick={addtocart} className='pointer-events-auto border border-orange-300 px-4 py-2 rounded-2xl font-medium hover:bg-orange-300 focus:ring focus:ring-orange-200'>Card</Link>
                                                            <Link className='border border-orange-300 px-4 py-2 rounded-2xl font-medium hover:bg-orange-300 focus:ring focus:ring-orange-200'>Favorite</Link>
                                                        </div>
                                                        <p className='text-sm mt-3 mx-auto'>{product.rating}</p>
                                                    </div>
                                                </>
                                                : <p>Out of Stack</p>
                                            }
                                        </Link>
                                    )
                                    )}
                            </Slider>
                    }
                </div>


            </>
        )
    }
    return (
        <>
            <Banners />
            <div className='container max-w-[120rem] mt-5'>
                <ScrollableCategory Category={'Best Offers'} />
                <ScrollableCategory Category={'Monitors'} />
                <ScrollableCategory Category={'Laptops'} />
                <ScrollableCategory Category={'Storage'} />
            </div>
        </>
    )
}

export default HomeProducts
