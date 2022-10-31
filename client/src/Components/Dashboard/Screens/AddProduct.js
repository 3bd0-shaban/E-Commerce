import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DashHeeder, Sidebar, getError, Category } from '../../Exports'
import { UploadProductAction } from '../../../Redux/Slices/UploadProductSlice';
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { BsTrash } from 'react-icons/bs'
import { Helmet } from 'react-helmet-async';
import { Success,Danger } from './../../Alerts';
const AddProduct = () => {
    const { error, success, loading } = useSelector((state) => state.Upload_Product);
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        name: '', des: '', stock: '', price: '', brand: '', category: '', subcategory: ''
    });
    const [images, setImages] = useState([]);
    const loadFile = (e) => {
        for (const file of e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImages((imgs) => [...imgs, reader.result]);
            }
            reader.onerror = () => {
                console.log(reader.error);
            };
        }
    }
    const handleChange = ({ currentTarget: input }) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, des, stock, price, brand, category, subcategory } = inputs
        if (!images) {
            dispatch(UploadProductAction.Fail_Upload(getError('No Images founded Please upload one image at least')));
        }
        if (!images) return;
        try {
            dispatch(UploadProductAction.Upload_Data());
            const res = await axios.post('http://localhost:5000/api/upload/uploadproduct', { images, name, des, stock, price, brand, category, subcategory });
            dispatch(UploadProductAction.Success_Upload(res.data));
            setImages('');
            setInputs({ name: '', des: '', stock: '', price: '', brand: '', category: '', subcategory: '' });
        } catch (error) {
            dispatch(UploadProductAction.Fail_Upload(getError(error)));
        }
    }
    const PreviewImeges = (props) => {
        return (
            <div className='mb-4'>
                <div className='border rounded-md  py-3 mt-5 w-full flex justify-between'>
                    <div className='flex items-center'>
                        <img className='h-12 w-12 object-cover mx-3' src={props.img} alt='' />
                        <div>
                            <p>product name</p>
                            <p className='text-xs'>product name</p>
                        </div>
                    </div>
                    <button className='mr-2 text-3xl flex items-center' onClick={props.onClick} key={props.mykey}>
                        <BsTrash />
                    </button>
                </div>
            </div>
        )
    }
    return (
        <>
            <Helmet>
                <title>Add New Product - Dashboard</title>
            </Helmet>
            <DashHeeder />
            <div className='flex'>
                <Sidebar />
                <div className='container px-1 lg:ml-80 mt-24'>
                    {error && <Danger error={error} className={'container'} />}
                    {success && <Success error={success} className={'container'} />}
                    <div className=' container px-0 max-w-8xl'>
                        <p className='text-4xl font-bold font-Roboto ml-8 text-gray-600 py-5'>Add New Product</p>
                        <form onSubmit={handleSubmit} className='px-6 rounded-xl py-8 h-full border lg:border-none'>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                                <div className='rounded-lg lg:border lg:px-10'>
                                    <p className='my-4 font-serif text-lg'>Add Images</p>
                                    <div className="flex justify-center items-center w-full">
                                        <label className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border border-slate-400 border-dashed cursor-pointer">
                                            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                                <HiOutlineCloudUpload style={{ fontSize: '3.5rem', color: 'rgb(156 163 175)' }} />
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                            <input onChange={loadFile} name='image' accept='image/png,image/jpg' id="dropzone-file" multiple type="file" className="hidden" />
                                        </label>
                                    </div>
                                    {images && images.map((image, index) => (
                                        <PreviewImeges img={image} mykey={index} onClick={() => setImages(images.filter((e) => e !== image))} />
                                    ))}
                                </div>
                                <div className='lg:border rounded-lg lg:px-10'>
                                    <div className='flex gap-4'>
                                    </div>
                                    <div className='flex gap-3 mt-4'>
                                        <div className='w-1/2'>
                                            <label className='text-sm py-3 font-light font-serif text-gray-500'>Product Name</label>
                                            <input onChange={handleChange} value={inputs.name} name='name' className='inputfield w-full' type='text' placeholder='Product name' />
                                        </div>
                                        <div className='w-1/2'>
                                            <label className='text-sm py-3 font-light font-serif text-gray-500'>Price</label>
                                            <input onChange={handleChange} value={inputs.price} name='price' min='0' className='inputfield w-full' type='number' placeholder='Price in EG' />
                                        </div>
                                    </div>
                                    <label className='text-sm py-3 font-light font-serif text-gray-500'>Description</label>
                                    <textarea onChange={handleChange} value={inputs.des} name='des' className='inputfield w-full h-52 resize-none' cols='10' />
                                    <div>
                                        <label className='text-sm py-3 font-light font-serif text-gray-500'>Quentity in stock</label>
                                        <input onChange={handleChange} value={inputs.stock} name='stock' className='inputfield w-full' type='number' placeholder='Available Pieces' />
                                        <label className='text-sm py-3 font-light font-serif text-gray-500'>Brand</label>
                                        <input onChange={handleChange} value={inputs.brand} name='brand' className='inputfield w-full' type='text' placeholder='Brand' />
                                    </div>
                                    <Category onChange={handleChange} valuecat={inputs.category} valuesub={inputs.subcategory} />
                                    <button type='submit' className='bg-green-500 py-2 my-3 px-3 rounded-lg text-white font-semibold w-1/2 focus:ring focus:ring-green-400 mt-5'>{loading ? 'Uploading ......' : 'Submit'}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct
