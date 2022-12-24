import React from 'react'
import { SKBanners } from '../../Exports';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useGetBannerQuery } from '../../../Redux/APIs/BannerApi';
const Banners = () => {
    const settings = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 8000,
        pauseOnHover: true,
        infinite: true,
        arrows: false,
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
    const { data: Banners, isLoading: loading } = useGetBannerQuery()
    return (

        loading ?
            <SKBanners /> :
            <div className='max-w-full cursor-pointer'>
                <Slider {...settings}>
                    {Banners?.map((image) => (
                        <div key={image}>
                            <img className='w-full object-cover h-[10rem] md:h-[25rem] lg:h-[20rem] xl:h-[30rem] xxxl:h-[35rem]' src={image && image.banners.url} alt='' />
                        </div>
                    ))}
                </Slider>
            </div>
    )
}

export default Banners
