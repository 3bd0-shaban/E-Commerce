import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../Exports'
import { UploadProductAction } from '../Redux/Slices/UploadProductSlice';
import getError from './../utile';
import { Danger } from './../Components/Alerts';

const AddProduct = () => {
    const { error, success } = useSelector((state) => state.Upload_Product);
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        name: '',
        des: '',
        stock: '',
        price: '',
        brand: '',
        category: '',
        image: ''
    });
    const [image, setImage] = useState('')
    const [preview, setPreview] = useState()
    const handleChange = ({ currentTarget: input }) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!image) {
            setPreview(image)
            return
        }
        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [image])

    const onSelectImage = (e, image) => {
        if (!e.target.files || e.target.files.length === 0) {
            setFileTobase(image)
            return
        }
        setImage(e.target.files[0])
    }
    const setFileTobase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result)
        }
        console.log(file)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { image, name, des, stock, price, brand } = inputs;
        try {
            dispatch(UploadProductAction.Upload_Data());
            const res = await axios.post('http://localhost:5000/api/upload/uploadproduct', { image, name, des, stock, price, brand }, { withCredentials: true });
            setPreview('')
            dispatch(UploadProductAction.Success_Upload(res.data));
        } catch (error) {
            console.log(error)
            dispatch(UploadProductAction.Fail_Upload(getError(error)));
        }
    }

    return (
        <>
            <Header />
            <div className=' container max-w-7xl'>
                <div className=' mt-16 '>
                    <form onSubmit={handleSubmit} className='border px-4 rounded-xl shadow-lg py-8'>

                        <p className='text-4xl font-bold font-mono text-gray-600 py-5'>Add Product</p>

                        <div className="flex justify-center items-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800">
                                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                    <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input onChange={onSelectImage} value={inputs.image} name='image' id="dropzone-file" multiple type="file" className="hidden" />
                            </label>
                        </div>
                        {error && <Danger error={error} className={'mx-auto mt-5 text-lg text-gray-700 font-serif font-semibold bg-red-200 py-3 px-5'} />}
                        {success && <Danger error={success} className={'mx-auto mt-5 text-lg text-gray-700 font-serif font-semibold bg-green-200 py-3 px-5'} />}
                        {image && <img src={preview} className='h-80 py-2' alt='' />}
                        <div className='flex gap-3 mt-4'>
                            <input onChange={handleChange} value={inputs.name} name='name' className='inputfield w-2/5' type='text' placeholder='Product name' />
                            <input onChange={handleChange} value={inputs.des} name='des' className='inputfield w-2/5' type='text' placeholder='product description' />
                        </div>
                        <div className=''>
                            <input onChange={handleChange} value={inputs.stock} name='stock' className='inputfield w-full' type='number' placeholder='available pieces' />
                            <input onChange={handleChange} value={inputs.price} name='price' className='inputfield w-full' type='number' placeholder='price' />
                            <input onChange={handleChange} value={inputs.brand} name='brand' className='inputfield w-full' type='text' placeholder='Brand' />

                        </div>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                        <select onChange={handleChange} id="category" value={inputs.category} name='category' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
                            <option value=''>-- - Select One ---</option>
                            <option value='laptops'>Laptops</option>
                            <option value='phones'>Phones</option>
                            <option value='taplets'>taplets</option>
                        </select>
                        <button className='bg-green-500 py-2 px-3 rounded-lg text-white font-semibold w-1/2 focus:ring focus:ring-green-400 mt-5'>Submit</button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default AddProduct
