import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Fetch_Category, Upload_New_Category } from '../../../Redux/Actions/CategoryAction'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { Success, Danger } from './../../Alerts';
import moment from 'moment';
import { FeaturesAction } from './../../../Redux/Slices/FeaturesSlice';
import CategoryInfo from './Sub_Layouts/CategoryInfo';
const AddCategory = () => {
    const { error, success, loading, Category } = useSelector((state) => state.Category);
    const dispatch = useDispatch();
    const [id, setId] = useState('');
    const [inputs, setInputs] = useState({
        category: '', des: '', nameOfSub: []
    });
    const [image, setImage] = useState([]);
    const loadFile = (e) => {
        for (const file of e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result);
            }
        }
    }
    const handleChange = ({ currentTarget: input }) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { category, nameOfSub, des } = inputs
        dispatch(Upload_New_Category(category, nameOfSub, image, des));
    }
    useEffect(() => {
        dispatch(Fetch_Category());
        setImage('')
        setInputs({ category: '', des: '', nameOfSub: '' });
    }, [dispatch]);
    const PreviewImeges = (props) => {
        return (
            <>
                <img className='relative object-cover max-h-40 rounded-lg' src={props.img} alt='' />
                <button className='text-red-500 font-semibold hover:underline mt-3 ml-auto block' onClick={props.onClick}>Remove Image</button>
            </>
        )
    }
    return (
        <>
            {error && <Danger error={error} className={'container'} />}
            {success && <Success error={success} className={'container'} />}
            <CategoryInfo id={id} />
            <div className='container px-0 max-w-8xl'>
                <form onSubmit={handleSubmit} className='px-6 rounded-xl py-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-8'>
                        <div className='rounded-lg lg:border lg:px-10 col-span-1 max-h-[52rem]'>
                            <div className='mt-4'>
                                <label className='text-sm py-3 font-light font-serif text-gray-500'>Category Name</label>
                                <input onChange={handleChange} value={inputs.category} name='category' className='inputfield w-full' type='text' placeholder='Product name' />
                                <label className='text-sm py-3 font-light font-serif text-gray-500'>Discription</label>
                                <input onChange={handleChange} value={inputs.des} name='des' min='0' className='inputfield w-full' type='text' placeholder='Add Some Words discribing the category' />
                                <label className='text-sm py-3 font-light font-serif text-gray-500'>Sub Categoreies</label>
                                <div>
                                    <input onChange={handleChange} value={inputs.nameOfSub} className='inputfield w-full' type="text" name="nameOfSub" placeholder="Enter Sub Categoreies" />
                                    <small className='text-gray-400 text-sm '>Separate keywords with a comma, space bar, or enter key</small>
                                </div>
                            </div>
                            <p className='my-4 font-serif text-lg'>Add Image</p>
                            <div className="flex justify-center items-center w-full">
                                <label className="flex flex-col justify-center items-center w-full h-64 mb-3 bg-gray-50 rounded-lg border border-slate-400 border-dashed cursor-pointer">
                                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                        <HiOutlineCloudUpload style={{ fontSize: '3.5rem', color: 'rgb(156 163 175)' }} />
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input onChange={loadFile} name='image' accept='image/*' id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>
                            {image && <PreviewImeges img={image} onClick={() => setImage(image.filter((e) => e !== image))} />}
                            <button type='submit' className='bg-green-500 py-2 my-3 px-3 rounded-lg text-white font-semibold w-1/2 focus:ring focus:ring-green-400 mt-5 mb-10'>{loading ? 'Uploading ......' : 'Submit'}</button>
                        </div>
                        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5 col-span-2">
                            <table className="w-full text-sm text-left text-gray-500 mt-5">
                                <thead className="text-xs text-gray-700 uppercase border-b-2 py-3">
                                    <tr className=''>
                                        <th scope="col" className="py-3 pl-5">Image</th>
                                        <th scope="col" className="py-3">Category</th>
                                        <th scope="col" className="py-3">Active ?</th>
                                        <th scope="col" className="py-3">Date</th>
                                        {/* <th scope="col" className="py-3 px-6"></th> */}
                                    </tr>
                                </thead>
                                <tbody onClick={() => dispatch(FeaturesAction.Show_SideCategoryInfo())}>
                                    {loading ? <p className='mx-auto text-5xl font-Alegreya flex items-center'>Loading</p> :
                                        Category?.map(cat => (
                                            <tr className="bg-white border-b hover:bg-gray-50 cursor-pointer" key={cat._id} onClick={() => setId(cat._id)}>
                                                <td className="flex items-center py-4 justify-start ml-7">
                                                    <img className="w-10 h-10 rounded-full object-cover" src={cat.image && cat?.image.url} alt="" />
                                                </td>
                                                <td className="font-normal text-gray-500 ">{cat.category}</td>
                                                {/* <td className="py-4 px-6 w-[20%]">{cat.nameOfSub[0]}</td> */}
                                                <td className="py-4"><span className={(`${cat.isActive}` === 'true') ? 'bg-green-200 text-green-500 rounded-full text-base px-8 py-1.5' : 'bg-red-200 text-red-500 rounded-full text-base px-8 py-1.5'}>{cat.isActive.toString()}</span></td>
                                                <td className="py-4 px-6">{moment(cat.createdAt).format('Do MMMM YYYY')}</td>
                                            </tr>
                                        ))}
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
