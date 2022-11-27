import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Fetch_Category } from '../../../Redux/Actions/CategoryAction'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { BsTrash } from 'react-icons/bs'
import { Success, Danger } from './../../Alerts';
import { Upload_Product } from './../../../Redux/Actions/ProductsAction';
const AddCategory = () => {
    const { error, success, loading } = useSelector((state) => state.Upload_Product);
    const { Category } = useSelector((state) => state.Category);
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
            };
        }
    }
    const handleChange = ({ currentTarget: input }) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, des, stock, price, brand, category, subcategory } = inputs
        dispatch(Upload_Product(images, name, des, stock, price, brand, category, subcategory, setImages, setInputs));
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
    useEffect(() => {
        dispatch(Fetch_Category())
    }, [dispatch])
    return (
        <>

            {error && <Danger error={error} className={'container'} />}
            {success && <Success error={success} className={'container'} />}
            <div className='container px-0 max-w-8xl'>
                <form onSubmit={handleSubmit} className='px-6 rounded-xl py-8 border lg:border-none'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        <div className='rounded-lg lg:border lg:px-10 col-span-1'>
                            <div className='mt-4'>
                                <label className='text-sm py-3 font-light font-serif text-gray-500'>Category Name</label>
                                <input onChange={handleChange} value={inputs.name} name='name' className='inputfield w-full' type='text' placeholder='Product name' />
                                <label className='text-sm py-3 font-light font-serif text-gray-500'>Price</label>
                                <input onChange={handleChange} value={inputs.price} name='price' min='0' className='inputfield w-full' type='number' placeholder='Price in EG' />
                            </div>
                            <p className='my-4 font-serif text-lg'>Add Images</p>
                            <div className="flex justify-center items-center w-full">
                                <label className="flex flex-col justify-center items-center w-full h-64 mb-10 bg-gray-50 rounded-lg border border-slate-400 border-dashed cursor-pointer">
                                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                        <HiOutlineCloudUpload style={{ fontSize: '3.5rem', color: 'rgb(156 163 175)' }} />
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input onChange={loadFile} name='image' accept='image/*' id="dropzone-file" multiple type="file" className="hidden" />
                                </label>
                            </div>
                            {images && images.map((image, index) => (
                                <PreviewImeges img={image} mykey={index} onClick={() => setImages(images.filter((e) => e !== image))} />
                            ))}
                        </div>
                        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5 col-span-2">
                            <table className="w-full text-sm text-left text-gray-500 mt-5">
                                <thead className="text-xs text-gray-700 uppercase border-b-2 py-3">
                                    <tr className=''>
                                        <th scope="col" className="py-3 px-6">Image</th>
                                        <th scope="col" className="py-3 px-6">Category</th>
                                        <th scope="col" className="py-3 px-6">Amount</th>
                                        <th scope="col" className="py-3 px-6">Date</th>
                                        {/* <th scope="col" className="py-3 px-6"></th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? <p className='mx-auto text-5xl font-Alegreya flex items-center'>Loading</p>
                                        : error ?
                                            <Danger error={error} className={'container max-w-7xl mx-auto my-5 w-[50vw]'} /> :
                                            Category.map(user =>
                                                <tr className="bg-white border-b hover:bg-gray-50" key={user._id}>
                                                    <td className="flex items-center py-4 justify-start ml-7">
                                                        <img className="w-10 h-10 rounded-full" src={user.image} alt="" />
                                                    </td>
                                                    <td className="font-normal text-gray-500 ">{user.category}</td>
                                                    <td className="py-4 px-6 w-[20%]">{user.isAdmin}</td>
                                                    <td className="py-4 px-6">{user.isAdmin}</td>
                                                    {/* <td className="py-4 px-6">{user.createdAt}</td> */}

                                                </tr>
                                            )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddCategory
