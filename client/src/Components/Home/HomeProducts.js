import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { ProductsAction } from '../../Redux/Slices/ProductSlice'
import { Helmet } from 'react-helmet-async';
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai'
import { MdShoppingBag } from 'react-icons/md'
import { SKHomeProducts, getError } from './../Exports';
import { Danger } from './../Alerts';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CartActions } from './../../Redux/Slices/CartSlice';
import { Get_AllProducts } from '../../Redux/Actions/ProductsAction'
const HomeProducts = () => {
    const params = useParams();
    const { id } = params;
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(Get_AllProducts())

    }, [dispatch]);

    const AddtoCart = async (event) => {
        event.preventDefault();
        const userID = user._id
        try {
            const config = {
                header: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            };
            dispatch(CartActions.Addtocart_Request());
            const res = await axios.post('http://localhost:5000/api/cart/new', { id, userID }, config);
            dispatch(CartActions.Addtocart_Success(res.data));
        } catch (error) {
            dispatch(CartActions.Addtocart_Fails(getError(error)));
        }
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
    const ScrollableCategory = (props) => {

        return (
            <>
                <Helmet>
                    <title>Market</title>
                </Helmet>
                <div className='flex justify-between mt-8'>
                    <p className='text-3xl font-Alegreya font-bold uppercase'>{props.Category}</p>
                    <Link className='text-xl font-serif font-semibold mb-3 px-3 py-2'>Browser All</Link>
                </div>
                <hr className='mt-4 h-[2px] bg-gray-200 rounded' />
                <div>
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
                            </div> : error ? <Danger /> :
                                <Slider {...settings}>
                                    {products.map((product) => (
                                        <div key={product._id} className=' product px-3'>
                                            <div className='mt-2'>
                                                <div className='h-72 flex items-center relative overflow-hidden justify-center w-[85%] mx-auto'>
                                                    <Link to={`/product/${product._id}`}><img src={product.images ? product.images[0].url : 'Can not load images'} className='rounded-2xl object-fill mx-auto' alt={product.name}></img></Link>
                                                    {product.stock > 0 &&
                                                        <div className='-bottom-20 inset-x-0 hover:block max-h-full absolute text-white items'>
                                                            <div className='flex justify-center gap-4'>
                                                                <Link onClick={AddtoCart} className='rounded-full flex items-center font-medium text-orange-300 hover:text-white p-2 text-xl border border-orange-300 hover:bg-orange-300 focus:ring focus:ring-orange-200'><MdShoppingBag /></Link>
                                                                <Link className='rounded-full flex items-center font-medium text-orange-300 hover:text-white p-2 text-xl border border-orange-300 hover:bg-orange-300 focus:ring focus:ring-orange-200'><AiOutlineHeart /></Link>
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
                                                        <div className='mt-5 text-center'>
                                                            <Link to={`/product/${product._id}`} className='text-xl hover:text-orange-300 font-semibold'>{product.name}</Link>
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
                    }
                </div>
            </>
        )
    }
    return (
        <>
            <div className='container max-w-[130rem] mt-5'>
                <ScrollableCategory Category={'Best Offers'} />
                <ScrollableCategory Category={'Monitors'} />
                <ScrollableCategory Category={'Laptops'} />
                <ScrollableCategory Category={'Storage'} />
            </div>
        </>
    )
}

export default HomeProducts
