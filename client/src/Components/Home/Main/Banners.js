import React, { useEffect, useState } from 'react'
import { SKBanners } from '../../Exports';
import { useGetBannerQuery } from '../../../Redux/APIs/BannerApi';
import { useSpring, animated } from '@react-spring/web';
import { BiChevronRight } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs';
const Banners = () => {
    const { data: Banners, isLoading: loading } = useGetBannerQuery() || {};
    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(Banners)
    }, [Banners]);
    const prevSlide = () => {
        const isFirstSlide = activeIndex === 0;
        const newIndex = isFirstSlide ? Banners.length - 1 : activeIndex - 1;
        setActiveIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = activeIndex === Banners.length - 1;
        const newIndex = isLastSlide ? 0 : activeIndex + 1;
        setActiveIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setActiveIndex(slideIndex);
    };
    const slideProps = useSpring({
        config: { duration: 300 },
        from: { transform: `translateX(-100%)` },
        to: { transform: `translateX(0%)` },
    });
    return (
        loading ?
            <SKBanners /> :
            <div className='relative overflow-hidden'>
                <animated.div style={slideProps} className='max-w-full cursor-pointer flex overflow-hidden duration-300'>
                    <img className='w-full object-cover h-[10rem] md:h-[25rem] lg:h-[20rem] xl:h-[30rem] xxxl:h-[35rem]' src={images && images[activeIndex]?.banners?.url} alt='' />
                </animated.div>
                <div className='absolute inset-y-1/2 flex justify-between w-full px-4'>
                    <button onClick={prevSlide} className='bg-white/30 text-black h-8 w-8 rounded-full flex justify-center items-center'><BiChevronRight size={25} /></button>
                    <button onClick={nextSlide} className='bg-white/30 text-black h-8 w-8 rounded-full flex justify-center items-center'><BiChevronRight size={25} /></button>
                </div>
                <div className='flex justify-center inset-x-1/2 absolute bottom-0 py-2'>
                    {images?.map((slide, slideIndex) => (
                        <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className={`cursor-pointer  ${slideIndex === activeIndex ? 'text-white' : 'text-gray-500 '}`}><BsDot size={30} /></div>
                    ))}
                </div>
            </div>
    )
}

export default Banners
