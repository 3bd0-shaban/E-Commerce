import axios from 'axios';
import React, { useEffect, Component } from 'react'
import { Get_BannersAction } from './../../Redux/Slices/BannersSlice';
import { useSelector, useDispatch } from 'react-redux'
import getError from '../../utile';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Banners = () => {
    const dispatch = useDispatch();


    var settings = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        infinite: true,
        // fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };



    const { loading, Banners } = useSelector((state) => state.Banners);
    const responsive = {
        desktop: {
            breakpoint: {
                max: 3000,
                min: 1024
            },
            items: 1
        },
        mobile: {
            breakpoint: {
                max: 464,
                min: 0
            },
            items: 1
        },
        tablet: {
            breakpoint: {
                max: 1024,
                min: 464
            },
            items: 1
        }
    };
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
        <div className='w-[97%] mx-auto'>
            <Slider {...settings}>
                {Banners && Banners.map((image) => (
                    <div>
                        <img className='w-full' key={image} src={image.banners.url} alt='' />
                    </div>

                ))}
            </Slider>
        </div>
    )
}

export default Banners
