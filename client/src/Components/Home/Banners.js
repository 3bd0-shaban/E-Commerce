import axios from 'axios';
import React, { useEffect } from 'react'
import { Get_BannersAction } from './../../Redux/Slices/BannersSlice';
import { useSelector, useDispatch } from 'react-redux'
import getError from '../../utile';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Banners = () => {
    const dispatch = useDispatch();
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
        <div className='relative container max-w-8xl'>
            {loading ? <p>Loading .....</p> :
                <Carousel additionalTransfrom={0} autoPlay arrows autoPlaySpeed={3000} centerMode={false} className="" containerClass="container" dotListClass=""
                    draggable focusOnSelect={false} infinite itemClass="" keyBoardControl minimumTouchDrag={80} pauseOnHover renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false} renderDotsOutside={false} rewind={false} rewindWithAnimation={false} rtl={false} shouldResetAutoplay showDots
                    sliderClass="" slidesToSlide={1} swipeable responsive={responsive}>
                    {Banners && Banners.map((image) => (
                        <img className='w-full' key={image} src={image.banners.url} alt='' />
                    ))}
                </Carousel>
            }
        </div>
    )
}

export default Banners
