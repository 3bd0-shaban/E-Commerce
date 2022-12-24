import React, { useState } from 'react'
import { Danger, Success } from '../../Alerts';
import { Helmet } from 'react-helmet-async';
import { useCreateBannerMutation } from '../../../Redux/APIs/BannerApi';
import { ImSpinner7 } from 'react-icons/im';
import AddImage from './Sub_Layouts/AddImage';
import { Banners } from '../../Exports';
const Addbanner = () => {
    const [image, setImage] = useState([]);
    const [CreateBanner, { error, isSuccess, isLoading }] = useCreateBannerMutation();
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
    const HandleSubmit = async (event) => {
        event.preventDefault();
        const data = { image }
        if (!image) return {};
        await CreateBanner(data).unwrap();
        setImage('');
    }
    const From = (props) => {
        return (
            <>
                <form onSubmit={props.onSubmit} className='p-5'>
                    <label className='text-sm py-3 font-light font-Rubik text-gray-500'>{props.Title}</label>
                    <p className=' py-2 text-base  text-gray-500 font-light block'>{props.Des}</p>
                    <AddImage />
                    <div className=''>
                        <button type='submit' className='btn-success' disabled={isLoading}>
                            {isLoading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'><ImSpinner7 /> </span> : 'Submit'}</button>
                    </div>
                </form>
                {image && <img src={image} className='py-2' alt='' />}
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>Add Banner</title>
            </Helmet>
            <div className='flex'>
                {error && <Danger error={error.data.msg} className={'container my-5'} />}
                {isSuccess && <Success error={'Banner uploaded Successfully'} className={'container my-5'} />}
                <div className='container px-0 max-w-full mt-5'>
                    <div className='grid grid-cols-1 xl:grid-cols-4 gap-5'>
                        <div className='xl:cols-span-1 border rounded-lg'>
                            <From onSubmit={HandleSubmit} Title={'Add Banner'} Des={'Note That ! you are limited whith only 4 images for both banners and side images'} />
                        </div>
                        <div className='xl:col-span-3 px-5'><Banners /></div>
                    </div>
                    <div className='grid grid-cols-1 xl:grid-cols-4 gap-5 my-8'>
                        <div className='xl:col-span-1 border rounded-lg'><From onSubmit={HandleSubmit} Title={'Add Side Images'} /></div>
                        <div className='xl:col-span-3'>
                            <div className='grid grid-cols-2 xl:grid-cols-4 gap-5 px-5'>
                                <img className='w-full object-cover h-[17rem]' src='https://res.cloudinary.com/abdo9/image/upload/v1667226242/Market/bdrtt9rzjht2dipmrlqn.png' alt='' />
                                <img className='w-full object-cover h-[17rem]' src='https://res.cloudinary.com/abdo9/image/upload/v1667230361/Market/o2j35oibma2rgxppk7yo.png' alt='' />
                                <img className='w-full object-cover h-[17rem]' src='https://res.cloudinary.com/abdo9/image/upload/v1667230361/Market/o2j35oibma2rgxppk7yo.png' alt='' />
                                <img className='w-full object-cover h-[17rem]' src='https://res.cloudinary.com/abdo9/image/upload/v1667230361/Market/o2j35oibma2rgxppk7yo.png' alt='' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addbanner
