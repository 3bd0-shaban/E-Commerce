import React, { useEffect, useState } from 'react'
import { SKBanners, Confirm } from '../../Exports';
import { useDeleteBannerMutation, useGetBannerQuery } from '../../../Redux/APIs/BannerApi';
// import { AnimatePresence, motion } from 'framer-motion';

import useAuth from './../../../Hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { FeaturesAction } from '../../../Redux/Slices/FeaturesSlice';
import { BiChevronRight } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs';
const Banners = () => {
  const { data: Banners, isLoading: loading } = useGetBannerQuery() || {};
  const [deleteBanner] = useDeleteBannerMutation();
  const { ConfirmModal } = useSelector(state => state.Features);
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [id, setID] = useState('');
  const { isAdmin } = useAuth();
  const dispatch = useDispatch();


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


  return (
    <>
      {ConfirmModal && <Confirm OnConfirm={() => { deleteBanner(id).unwrap(); dispatch(FeaturesAction.Show_Confirm(true)) }} />}
      {loading ?
        <SKBanners /> :

        <div className='relative overflow-hidden'>
          <div className='max-w-full cursor-pointer flex overflow-hidden duration-300 relative'>
            <img className='w-full object-cover h-[10rem] md:h-[25rem] lg:h-[20rem] xl:h-[30rem] xxxl:h-[35rem]' src={images && images[activeIndex]?.banners?.url} alt='' />
            {isAdmin &&
              <div onClick={() => { dispatch(FeaturesAction.Show_Confirm(true)); setID(images[activeIndex]?._id) }} className='absolute right-0 m-5 mt-2 text-white cursor-pointer'>
                <div className='text-2xl text-wihte'>x</div>
              </div>
            }
          </div>
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
      }
    </>
  )

  // )
}

export default Banners
