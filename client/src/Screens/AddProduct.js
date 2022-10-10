import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../Exports'
import ProductSlice from '../Redux/Slices/ProductSlice';
import getError from './../utile';

const AddProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { error } = useSelector((state) => state.auth)
    // const { token } = useSelector((state) => state.token)
    const [inputs, setInputs] = useState({
        image: '',
        name: '',
        des: '',
        quentity: '',
        price: '',
        brand: ''
    })
    const handleChange = ({ currentTarget: input }) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = inputs
        try {
            dispatch(ProductSlice.Fetch_Data());
            const res = await axios.post('http://localhost:5000/api/upload/product', { withCredentials: true });
            dispatch(ProductSlice.Success_Fetch(res.data));
            // dispatch(ProductSlice.Success_Fetch(res.data.token));
            navigate('/');
        } catch (error) {
            dispatch(ProductSlice.Fail_Fetch(getError(error)));
        }
    }
    return (
        <>
            <Header />
            <div className=' container max-w-7xl'>
                <div className=' mt-16 '>
                    <form onSubmit={handleSubmit} className='border px-4 rounded-xl shadow-lg py-8'>
                        <p className='text-4xl font-bold font-mono text-gray-600 py-5'>Add Product</p>

                        <div class="flex justify-center items-center w-full">
                            <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800">
                                <div class="flex flex-col justify-center items-center pt-5 pb-6">
                                    <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input onChange={handleChange} value={inputs.image} id="dropzone-file" multiple type="file" class="hidden" />
                            </label>
                        </div>

                        <div className='flex gap-3 mt-4'>
                            <input onChange={handleChange} value={inputs.name} name='name' className='inputfield w-2/5' type='email' placeholder='Product name' />
                            <input onChange={handleChange} value={inputs.des} name='des' className='inputfield w-2/5' type='text' placeholder='product description' />
                        </div>
                        <div className=''>
                            <input onChange={handleChange} value={inputs.quentity} name='quentity' className='inputfield w-full' type='number' placeholder='available pieces' />
                            <input onChange={handleChange} value={inputs.price} name='price' className='inputfield w-full' type='number' placeholder='price' />
                            <input onChange={handleChange} value={inputs.brand} name='brand' className='inputfield w-full' type='text' placeholder='Brand' />

                        </div>
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
                            <option selected="">Choose a country</option>
                            <option value="US">Laptops</option>
                            <option value="CA">Phones</option>
                            <option value="FR">taplets</option>
                            {/* <option value="DE">Germany</option> */}
                        </select>

                        <button className='bg-green-500 py-2 px-3 rounded-lg text-white font-semibold w-1/2 focus:ring focus:ring-green-400 mt-5 w-10'>Submit</button>
                        <div className='flex text-center items-center justify-center mt-5'>
                            <p>Don't have an account ?</p>
                            <Link to='/signup' className='text-sm font-poppins font-medium text-green-500 mt-1 ml-2'>Sign Up</Link>
                        </div>
                        {/* {error && <Danger error={error} className={'mx-auto mt-5 text-lg text-gray-700 font-serif font-semibold bg-red-200 py-3 px-5'} />} */}

                    </form>

                </div>
            </div>
        </>
    )
}

export default AddProduct
