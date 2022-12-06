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
    const { data: Banners, isLoading: loading } = useGetBannerQuery()
    return (

        loading ?
            <SKBanners /> :
            <div className='container max-w-[130rem] mx-0 ml-0 px-0 flex gap-3 mt-1'>
                <div className='max-w-full xl:max-w-[70%] cursor-pointer'>
                    <Slider {...settings}>
                        {Banners?.map((image) => (
                            <div key={image}>
                                <img className='w-full object-cover h-[10rem] md:h-[25rem] lg:h-[20rem] xl:h-[30rem] xxxl:h-[35rem]' src={image && image.banners.url} alt='' />
                            </div>

                        ))}
                    </Slider>
                </div>
                <div className='hidden xl:flex max-w-[30%]'>
                    <div className='grid grid-cols-1 gap-2'>
                        <img className='w-full object-cover h-[17rem]' src='https://res.cloudinary.com/abdo9/image/upload/v1667226242/Market/bdrtt9rzjht2dipmrlqn.png' alt='' />
                        <img className='w-full object-cover h-[17rem]' src='https://res.cloudinary.com/abdo9/image/upload/v1667230361/Market/o2j35oibma2rgxppk7yo.png' alt='' />
                        {/* <img className='w-full object-cover h-[14.7rem]' src='https://res.cloudinary.com/abdo9/image/upload/v1667230163/Market/nes2ik3wuyb7wxwcaubr.png' alt='' />
                        <img className='w-full object-cover h-[14.7rem]' src='https://res.cloudinary.com/abdo9/image/upload/v1667235118/Market/ebpk3p8skrxto0cz98ip.png' alt='' /> */}
                    </div>
                </div>
            </div>
    )
}

export default Banners
