import React, { useState } from 'react'
import { SKBanners, Confirm } from '../../Exports';
import { useDeleteBannerMutation, useGetBannerQuery } from '../../../Redux/APIs/BannerApi';
import useAuth from './../../../Hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { FeaturesAction } from '../../../Redux/Slices/FeaturesSlice';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper"; import { BsX } from 'react-icons/bs';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


const Banners = () => {
  const { data: Banners, isLoading: loading } = useGetBannerQuery() || {};
  const dispatch = useDispatch();
  const [deleteBanner] = useDeleteBannerMutation();
  const { ConfirmModal } = useSelector(state => state.Features);
  const [id, setID] = useState('');
  const { isAdmin } = useAuth();

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
          <Swiper
            slidesPerView={1}
            speed="500"
            loop="true"
            spaceBetween={5}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="h-full"
          >
            {Banners?.map((image) => (
              <SwiperSlide className='h-full' key={image?._id}>
                <img draggable={false} className='w-full h-full object-cover' src={image.banners.url} alt='' />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      }
    </>
  )

  // )
}

export default Banners
