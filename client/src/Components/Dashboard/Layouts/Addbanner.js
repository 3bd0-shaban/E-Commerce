import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Danger, Success } from '../../Alerts';
import { Helmet } from 'react-helmet-async';
import { Upload_Banner } from '../../../Redux/Actions/BannerAction';
const Addbanner = () => {

    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);
    const dispatch = useDispatch();
    const { error, success, loading } = useSelector((state) => state.Banners);
    const HandleImages = (e) => {
        const files = Array.from(e.target.files);
        setPreview([]);
        setImages(files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImages(oldArray => [...oldArray, reader.result]);
                setPreview(reader.result)
            }
        });
    };
    const HandleSubmit = async (e) => {
        e.preventDefault();
        dispatch(Upload_Banner(setPreview, preview));
    }
    return (
        <>
            <Helmet>
                <title>Add Banner</title>
            </Helmet>
            {/* <DashHeeder /> */}
            <div className='flex'>
                {/* <Sidebar /> */}
                <div className='container max-w-6xl lg:ml-80 mt-24'>
                    {error && <Danger error={error} className={'mx-auto mt-5 text-lg text-gray-700 font-serif font-semibold bg-red-200 py-3 px-5'} />}
                    {success && <Success error={success} />}
                    <form onSubmit={HandleSubmit} className='shadow-lg p-5 mt-10'>
                        <div className="flex justify-center items-center w-full">
                            <label className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800">
                                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                    <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input onChange={HandleImages} name='images' accept='image/*' type="file" className="hidden" />
                            </label>
                        </div>
                        <div className='flex justify-center'>
                            <button type='submit' className='bg-green-500 py-2 mx-auto px-3 rounded-lg text-white font-semibold w-1/2 focus:ring focus:ring-green-400 mt-5'>{loading ? 'Uploading .....' : 'Submit'}</button>
                        </div>
                    </form>
                    {preview && <img src={preview} className='h-80 py-2' alt='' />}
                </div>
            </div>
        </>
    )
}

export default Addbanner
