import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DashHeeder, Sidebar, getError } from '../../../Exports'
import { UploadProductAction } from '../../../Redux/Slices/UploadProductSlice';
import { Danger } from '../../../Components/Alerts';
import { CategoryAction } from '../../../Redux/Slices/CategorySlice';
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { BsTrash } from 'react-icons/bs'
const AddProduct = () => {
    const { error, success, loading } = useSelector((state) => state.Upload_Product);
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        name: '', des: '', stock: '', price: '', brand: '', category: ''
    });
    const [imageinput, setImageinput] = useState('');
    const [preview, setPreview] = useState('');
    // const [images, setImages] = useState([]);
    // const [multipleImagePreview, setMultipleImagePreview] = useState([]);
    const handleChange = ({ currentTarget: input }) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    const handleimage = (e) => {
        const file = e.target.files[0];
        PreviewFile(file);
        setImageinput(e.target.value)
    }
    const PreviewFile = (file) => {
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = () => {
            setPreview(Reader.result);
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, des, stock, price, brand, category } = inputs
        if (!preview) return;
        try {
            dispatch(UploadProductAction.Upload_Data());
            const res = await axios.post('http://localhost:5000/api/upload/uploadproduct', { preview, name, des, stock, price, brand, category });
            dispatch(UploadProductAction.Success_Upload(res.data));
            setPreview('');
            setInputs('');
        } catch (error) {
            dispatch(UploadProductAction.Fail_Upload(getError(error)));
        }


    }

    const Category = () => {
        const { Category } = useSelector((state) => state.Category)
        useEffect(() => {
            const FetchData = async () => {
                dispatch(CategoryAction.Fetch_Category_Request())
                try {
                    const result = await axios.get('http://localhost:5000/api/category/get');
                    dispatch(CategoryAction.Fetch_Category_Success(result.data));
                } catch (error) {
                    dispatch(CategoryAction.Fetch_Category_Fails(getError(error)));
                }
            };
            FetchData();
        }, []);
        return (
            <>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                        <select onChange={handleChange} id="category" value={inputs.category} name='category' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
                            {Category.map((cat) => (
                                <option key={cat._id} value={cat.category}>{cat.category}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                        <select onChange={handleChange} id="category" value={inputs.category} name='category' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
                            {Category.map((cat) => (
                                cat.subcategory.map((child) => (
                                    <option key={child} value={child}>{child}</option>
                                ))
                            ))}
                        </select>
                    </div>
                </div>
            </>
        )
    }

    // const Handlemultipleimages = (e) => {
    //     const files = Array.from(e.target.files);
    //     setImages([]);
    //     setMultipleImagePreview([])
    //     files.forEach(file => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onloadend = () => {
    //             setImages(oldArray => [...oldArray, reader.result]);
    //             setMultipleImagePreview(reader.result)
    //         }
    //     })
    // }

    const PreviewImeges = () => {
        return (
            <div className='mb-4'>
                <div className='border rounded-md py-3 mt-5 w-full flex justify-between'>
                    <div className='flex'>
                        <img className='h-5 mx-3' src='https://i.morioh.com/2022/04/11/f359adfe.webp' alt='' />
                        <div>
                            <p>product name</p>
                            <p className='text-xs'>product name</p>
                        </div>
                    </div>
                    <div className='mr-2 text-3xl flex items-center'>
                        <BsTrash />
                    </div>
                </div>
            </div>
        )
    }


    { error && <Danger error={error} className={'mx-auto mt-5 text-lg text-gray-700 font-serif font-semibold bg-red-200 py-3 px-5'} /> }
    { success && <Danger error={success} className={'mx-auto mt-5 text-lg text-gray-700 font-serif font-semibold bg-green-200 py-3 px-5'} /> }
    return (
        <>
            <DashHeeder />
            <div className='flex'>
                <Sidebar />
                <div className='container px-1 lg:ml-80 mt-24'>
                    <div className=' container px-0 max-w-8xl'>
                        <p className='text-4xl font-bold font-Roboto ml-4 text-gray-600 py-5'>Add New Product</p>
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
                                            <input onChange={handleimage} value={imageinput} name='image' accept='image/*' id="dropzone-file" multiple type="file" className="hidden" />
                                        </label>
                                    </div>
                                    <PreviewImeges />
                                    <PreviewImeges />
                                    <PreviewImeges />
                                    <PreviewImeges />
                                    <PreviewImeges />
                                </div>
                                <div className='lg:border rounded-lg lg:px-10'>
                                    <div className='flex gap-4'>
                                        {preview && <img src={preview} className='h-80 py-2' alt='' />}
                                    </div>
                                    <div className='flex gap-3 mt-4'>
                                        <div className='w-1/2'>
                                        <label>Product Name</label>
                                            <input onChange={handleChange} value={inputs.name} name='name' className='inputfield w-full' type='text' placeholder='Product name' />
                                        </div>
                                        <div className='w-1/2'>
                                        <label>Price</label>
                                            <input onChange={handleChange} value={inputs.des} name='name' className='inputfield w-full' type='text' placeholder='Product description' />
                                        </div>
                                    </div>
                                    <textarea className='inputfield w-full h-52 resize-none' cols='10' />
                                    <div className=''>
                                        <input onChange={handleChange} value={inputs.stock} name='stock' className='inputfield w-full' type='number' placeholder='available pieces' />
                                        <input onChange={handleChange} value={inputs.price} name='price' className='inputfield w-full' type='number' placeholder='price' />
                                        <input onChange={handleChange} value={inputs.brand} name='brand' className='inputfield w-full' type='text' placeholder='Brand' />

                                    </div>
                                    <Category />
                                    <button type='submit' className='bg-green-500 py-2 px-3 rounded-lg text-white font-semibold w-1/2 focus:ring focus:ring-green-400 mt-5'>{loading ? 'Uploading ......' : 'Submit'}</button>
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
