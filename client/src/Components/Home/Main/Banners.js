import React, { useState } from 'react'
import { SKBanners, Confirm } from '../../Exports';
import { useDeleteBannerMutation, useGetBannerQuery } from '../../../Redux/APIs/BannerApi';
// import { AnimatePresence, motion } from 'framer-motion';

import useAuth from './../../../Hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { FeaturesAction } from '../../../Redux/Slices/FeaturesSlice';
import Slider from 'react-slick';
import { BsX } from 'react-icons/bs';
const Banners = () => {
  const { data: Banners, isLoading: loading } = useGetBannerQuery() || {};
  const dispatch = useDispatch();
  const [deleteBanner] = useDeleteBannerMutation();
  const { ConfirmModal } = useSelector(state => state.Features);
  const [id, setID] = useState('');
  const { isAdmin } = useAuth();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
      {ConfirmModal && <Confirm OnConfirm={() => { deleteBanner(id).unwrap(); dispatch(FeaturesAction.Show_Confirm(true)) }} />}
      {loading ?
        <SKBanners /> :

        <div className='relative overflow-hidden h-full'>
          <div className='max-w-full cursor-pointer flex overflow-hidden duration-300 relative'>
            {isAdmin &&
              <div onClick={() => { dispatch(FeaturesAction.Show_Confirm(true)); setID(Banners?._id) }} className='absolute top-0 right-0 m-5 mt-2 text-white cursor-pointer'>
                <button className='text-2xl bg-black/50 h-10 w-10 text-white'><BsX /></button>
              </div>
            }
          </div>
          <Slider {...settings} className='h-full w-full'>
            {Banners?.map((image) => (
              <img draggable={false} className='w-full h-full' key={image?._id} src={image.banners.url} alt='' />
            ))}
          </Slider>
        </div>
      }
    </>
  )

  // )
}

export default Banners
