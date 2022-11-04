import axios from 'axios';
import React, { useEffect } from 'react'
import { Get_BannersAction } from './../../Redux/Slices/BannersSlice';
import { useSelector, useDispatch } from 'react-redux'
import { SKBanners } from './../Exports';
import getError from '../utile';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Banners = () => {
    const dispatch = useDispatch();


    const settings = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 8000,
        pauseOnHover: true,
        infinite: true,
        // fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                }
            },
            {
                breakpoint: 567,
                settings: {
                    arrows: false,
                }
            }
        ]
    };



    const { loading, Banners } = useSelector((state) => state.Banners);
    useEffect(() => {
        const Fetch_Banners = async () => {
            dispatch(Get_BannersAction.Fetch_Banners_Request());
            try {
                const result = await axios.get('http://localhost:5000/api/banner/get_banners');
                dispatch(Get_BannersAction.Fetch_Banners_Success(result.data));
            }
            catch (error) {
                dispatch(Get_BannersAction.Fetch_Banners_Fails(getError(error)));
            }
        };
        Fetch_Banners()
    }, [dispatch]);

    return (

        loading ?
            <SKBanners /> :
            <div className='container max-w-[130rem] flex gap-3 mt-1'>
                <div className='max-w-full xl:max-w-[70%] cursor-pointer'>
                    <Slider {...settings}>
                        {Banners && Banners.map((image) => (
                            <div key={image}>
                                <img className='w-full object-cover h-[10rem] md:h-[25rem] lg:h-[20rem] xl:h-[30rem] xxxl:h-[30rem]' src={image.banners.url} alt='' />
                            </div>

                        ))}
                    </Slider>
                </div>
                <div className='hidden xl:flex max-w-[30%]'>
                    <div className='grid grid-cols-2 gap-2'>
                        <img className='w-full object-cover h-[14.7rem]' src='https://res.cloudinary.com/abdo9/image/upload/v1667226242/Market/bdrtt9rzjht2dipmrlqn.png' alt='' />
                        <img className='w-full object-cover h-[14.7rem]' src='https://res.cloudinary.com/abdo9/image/upload/v1667230361/Market/o2j35oibma2rgxppk7yo.png' alt='' />
                        <img className='w-full object-cover h-[14.7rem]' src='https://res.cloudinary.com/abdo9/image/upload/v1667230163/Market/nes2ik3wuyb7wxwcaubr.png' alt='' />
                        <img className='w-full object-cover h-[14.7rem]' src='https://res.cloudinary.com/abdo9/image/upload/v1667235118/Market/ebpk3p8skrxto0cz98ip.png' alt='' />
                    </div>
                </div>
            </div>

    )
}

export default Banners
