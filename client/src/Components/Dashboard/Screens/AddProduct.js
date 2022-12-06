import React, { useState } from 'react'
import { DashHeeder, Sidebar, Category, PreviewImege, AddImage, AddSpecs } from '../../Exports'
import { Helmet } from 'react-helmet-async';
import { Success, Danger } from './../../Alerts';
import { useCreateProductsMutation } from '../../../Redux/APIs/ProductsApi';
import { ImSpinner7 } from 'react-icons/im';
const AddProduct = () => {
    const [createProducts, { isLoading, isSuccess, error }] = useCreateProductsMutation();
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
        const { name, des, stock, price, brand, category, subcategory } = inputs;
        const data = { name, des, stock, price, brand, category, subcategory }
        if (!inputs || !images) return {};
        createProducts(data).unwrap()
        setImages('');
        setInputs({ name: '', des: '', stock: '', price: '', brand: '', category: '', subcategory: '' });
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
                    {error && <Danger error={error.data.msg} className={'container my-5'} />}
                    {isSuccess && <Success error={''} className={'container my-5'} />}
                    <div className=' container px-0 max-w-8xl '>
                        <p className='text-4xl font-bold font-Roboto ml-8 text-gray-600 py-5'>Add New Product</p>
                        <form onSubmit={handleSubmit} className='px-6 rounded-xl py-8 h-full border lg:border-none'>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                                <div className='rounded-lg lg:border lg:px-10'>
                                    <p className='my-4 font-serif text-lg'>Add Images</p>
                                    <AddImage onChange={loadFile} IsMultiple={true} Hight={'h-64'} />
                                    {images && images.map((image, index) => (
                                        <PreviewImege img={image} mykey={index} onClick={() => setImages(images.filter((e) => e !== image))} />
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
                                    <AddSpecs />
                                    <button type='submit' className='btn-success' disabled={isLoading}>
                                        {isLoading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'><ImSpinner7 /> </span> : 'Submit'}</button>                                   </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct
