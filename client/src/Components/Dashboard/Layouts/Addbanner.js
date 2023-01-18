import React, { useState } from 'react'
import { Danger, Success } from '../../Alerts';
import {
    useCreateBannerMutation, useCreateSideBannerMutation, useCreateTopBannerMutation, useDeleteBannerMutation, useGetBannerSideQuery, useGetBannerTopQuery
} from '../../../Redux/APIs/BannerApi';
import { ImSpinner7 } from 'react-icons/im';
import AddImage from './Sub_Layouts/AddImage';
import { Banners, useTitle, Confirm } from '../../Exports';
import { FeaturesAction } from '../../../Redux/Slices/FeaturesSlice';
import { useDispatch, useSelector } from 'react-redux';
const Addbanner = () => {
    useTitle('Add Banner - Dashboard')
    const [image, setImage] = useState([]);
    const [imageTop, setImageTop] = useState([]);
    const [imageSide, setImageSide] = useState([]);
    const [top, setTop] = useState(true);
    const [side, setSide] = useState(false);
    const [id, setID] = useState('');
    const dispatch = useDispatch();
    const { ConfirmModal } = useSelector(state => state.Features);
    const [CreateBanner, { error, isSuccess, isLoading }] = useCreateBannerMutation();
    const [CreateTopBanner, { error: errortop, isSuccess: successtop, isLoading: Loadingtop }] = useCreateTopBannerMutation();
    const [CreateSideBanner, { error: errorside, isSuccess: successside, isLoading: Loadingside }] = useCreateSideBannerMutation();
    const [deleteBanner, { error: errordelete, isSuccess: successdelete }] = useDeleteBannerMutation();
    const { data: topbanner } = useGetBannerTopQuery() || {};
    const { data: Sidebanner } = useGetBannerSideQuery() || {};
    const HandleImages = (e) => {
        const files = Array.from(e.target.files);
        setImage([]);
        files.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result)
            }
        });
    };
    const HandleTopImages = (e) => {
        const files = Array.from(e.target.files);
        setImageTop([]);
        files.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImageTop(reader.result)
            }
        });
    };
    const HandleSideImages = (e) => {
        const files = Array.from(e.target.files);
        setImageSide([]);
        files.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImageSide(reader.result)
            }
        });
    };
    const HandleSubmit = async (event) => {
        event.preventDefault();
        const data = { image }
        if (!image) return {};
        await CreateBanner(data).unwrap();
        setImage('');
    };
    const HandleSubmitTop = async (event) => {
        event.preventDefault();
        const data = { imageTop }
        if (!imageTop) return {};
        await CreateTopBanner(data).unwrap();
        setImageTop('');
    };
    const HandleSubmitSide = async (event) => {
        event.preventDefault();
        const data = { imageSide }
        if (!imageSide) return {};
        await CreateSideBanner(data).unwrap();
        setImageSide('');
    };
    const From = (props) => {
        return (
            <>
                <form onSubmit={props.onSubmit} className='p-5'>
                    <label className='text-sm py-3 font-light font-Rubik text-gray-500'>{props.Title}</label>
                    <p className=' py-2 text-base  text-gray-500 font-light block'>{props.Des}</p>
                    <AddImage onChange={props.ImageHandler} />
                    <div className=''>
                        <button type='submit' className='btn-success' disabled={props.Loading}>
                            {props.Loading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'><ImSpinner7 /> </span> : 'Submit'}</button>
                    </div>
                </form>
                {props.Preview && <img src={props.Preview} className='py-2' alt='' />}
            </>
        )
    }
    return (
        <>
            {ConfirmModal && <Confirm OnConfirm={() => { deleteBanner(id).unwrap(); dispatch(FeaturesAction.Show_Confirm(true)) }} />}
            {(error || errortop || errorside || errordelete) && <Danger error={error?.data?.msg || errortop?.data?.msg || errorside?.data?.msg} className={'container max-w-full my-5'} />}
            {(isSuccess || successtop || successside || successdelete) && <Success error={'Banner uploaded Successfully'} className={'container max-w-full my-5'} />}
            <div className='flex'>
                <div className='container px-0 max-w-full mt-5'>
                    <div className='grid grid-cols-1 xl:grid-cols-4 gap-5'>
                        <div className='xl:cols-span-1 border rounded-lg'>
                            <From onSubmit={HandleSubmit} ImageHandler={HandleImages} Preview={image} Loading={isLoading} Title={'Add Banner'} Des={'Note That ! you are limited whith only 4 images for both banners and side images'} />
                        </div>
                        <div className='xl:col-span-3 px-5 relative'>
                            <Banners />
                        </div>
                    </div>
                    <div className='my-5'>
                        <div className='flex items-center p-2 gap-3'>
                            <input type='checkbox' onChange={() => { setSide(!side); setTop(!top) }} />
                            <p className='text-lg text-gray-500 font-semibold'>Activate Side Banner</p>
                        </div>
                        <div className='grid grid-cols-1 xl:grid-cols-4 gap-5 my-2'>
                            {top &&
                                <div className='xl:col-span-1 border rounded-lg'>
                                    <From onSubmit={HandleSubmitTop} Loading={Loadingtop} Preview={imageTop} ImageHandler={HandleTopImages} Title={'Add top Images'} />
                                </div>
                            }
                            {side &&
                                <div className='xl:col-span-1 border rounded-lg'>
                                    <From onSubmit={HandleSubmitSide} Loading={Loadingside} Preview={imageSide} ImageHandler={HandleSideImages} Title={'Add Side Images'} />
                                </div>
                            }
                            <div className='xl:col-span-3'>
                                <div className='grid grid-cols-2 xl:grid-cols-4 gap-5 px-5'>
                                    {topbanner?.map(banner => (
                                        <div key={banner._id} className='h-80 cursor-pointer hover:brightness-50 duration-200 group relative'>
                                            <img className='w-full object-cover h-[17rem]' src={banner?.banners?.url} alt='' />
                                            <div onClick={() => { dispatch(FeaturesAction.Show_Confirm(true)); setID(banner._id) }} className='absolute inset-1/2 top-[30%] z-10 gap-3 items-center w-full text-white font-bold hidden group-hover:flex'>
                                                <div className='text-2xl text-wihte'>x</div>
                                            </div>
                                        </div>
                                    ))}
                                    {Sidebanner?.map(banner => (
                                        <div key={banner._id} className='h-80 cursor-pointer hover:brightness-50 duration-200 group relative'>
                                            <img className='w-full object-cover h-[17rem]' src={banner?.banners?.url} alt='' />
                                            <div onClick={() => { dispatch(FeaturesAction.Show_Confirm(true)); setID(banner._id) }} className='absolute inset-1/2 top-[30%] z-10 gap-3 items-center w-full text-white font-bold hidden group-hover:flex'>
                                                <div className='text-2xl text-wihte'>x</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addbanner
