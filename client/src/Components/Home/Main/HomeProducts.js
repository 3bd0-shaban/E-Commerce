import { Link } from 'react-router-dom'
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai'
import { MdShoppingBag } from 'react-icons/md'
import { SKHomeProducts } from '../../Exports';
import { Danger } from '../../../Utils/Alerts';
import { useGetProductsQuery } from '../../../Redux/APIs/ProductsApi'
import { useAddToWhitelistMutation } from '../../../Redux/APIs/WhiteListApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddToCartMutation } from '../../../Redux/APIs/CartApi';
import { Swiper, useSwiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";


// import required modules
import { Pagination } from "swiper";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
const HomeProducts = (props) => {
    const { data: products, isLoading: loading, isError, error } = useGetProductsQuery() || {};
    const [addToWhitelist] = useAddToWhitelistMutation();
    const [addToCart] = useAddToCartMutation();

    const HandleToWhiteList = async (product_Id) => {
        await addToWhitelist(product_Id).unwrap()
            .then((payload) => toast.success(payload.msg))
            .catch((error) => toast.error(error.data.msg));
    }
    const AddToCartHandler = async (product_Id) => {
        await addToCart({ product_Id }).unwrap()
            .then((payload) => toast.success(payload.msg))
            .catch((error) => toast.error(error.data.msg));
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
            <ToastContainer position="bottom-center" closeOnClick autoClose={1200} hideProgressBar={true} limit={1} />
            <div className='flex items-center mb-5 gap-3'>
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
                <Danger error={error?.data?.msg || 'Can not load products'} />
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
                }}
                speed="500"
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
                {products &&
                    products?.map((product) => (
                        <SwiperSlide key={product._id} className=' product px-3 select-none'>
                            <div className='mt-2'>
                                <div className=' flex items-center relative overflow-hidden justify-center w-[85%] mx-auto'>
                                    <Link draggable={false} to={`/product/${product._id}`}><img draggable={false} src={product.images ? product.images[0].url : 'Can not load images'} className='rounded-2xl max-h-44 object-cover mx-auto' alt={product.name}></img></Link>
                                    {product.stock > 0 &&
                                        <div className='-bottom-20 inset-x-0 hover:block max-h-full absolute text-white items'>
                                            <div className='flex justify-center gap-4'>
                                                <Link draggable={false} onClick={() => AddToCartHandler(product._id)}
                                                    className='rounded-full flex items-center font-medium text-orange-300 hover:text-white p-2 text-xl border border-orange-300 hover:bg-orange-300 focus:ring focus:ring-orange-200'><MdShoppingBag /></Link>
                                                <Link draggable={false} onClick={() => HandleToWhiteList(product._id)}
                                                    className='rounded-full flex items-center font-medium text-orange-300 hover:text-white p-2 text-xl border border-orange-300 hover:bg-orange-300 focus:ring focus:ring-orange-200'><AiOutlineHeart /></Link>
                                            </div>
                                            <p className='text-sm mt-3 mx-auto'>{product.rating}</p>
                                        </div>
                                    }
                                    <div className='-left-10 hover:block max-h-full absolute text-white watchitem'>
                                        <Link draggable={false} to={`/product/${product._id}`} className='rounded-full flex items-center font-medium text-orange-300 hover:text-white p-2 text-xl border border-orange-300 hover:bg-orange-300 focus:ring focus:ring-orange-200'>
                                            <AiOutlineEye />
                                        </Link>
                                    </div>

                                </div>
                                {product.stock > 0 ?
                                    <>
                                        <div className='mt-5 text-center '>
                                            <Link draggable={false} to={`/product/${product._id}`} className='text-xl hover:text-orange-300 font-semibold ellipse-2'>{product.name}</Link>
                                            <p className='text-xl mt-4 font-semibold text-cyan-600'>{product.price}$</p>
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
export default HomeProducts