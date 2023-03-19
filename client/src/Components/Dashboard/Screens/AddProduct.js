import React, { useState } from 'react';
import { DashHeeder, Sidebar, PreviewImege, AddImage, Category, useTitle, Editor } from '../../Exports'
import { Success, Danger } from '../../../Utils/Alerts';
import { useCreateProductsMutation } from '../../../Redux/APIs/ProductsApi';
import { ImSpinner7 } from 'react-icons/im';
import { useGetBrandQuery } from '../../../Redux/APIs/BrandApi';
import { BsTrash } from 'react-icons/bs';
const AddProduct = () => {
    useTitle('Add New Product - Dashboard')
    const [createProducts, { isLoading, isSuccess, error }] = useCreateProductsMutation();
    const { data: Brand } = useGetBrandQuery();
    const [inputs, setInputs] = useState({
        name: '', des: '', stock: '', price: '', brand: '', category: '', subcategory: '', discountprice: ''
    });
    const [fulldes, setFullDes] = useState('');
    const [warranty, setWarranty] = useState(false)
    const [images, setImages] = useState([]);
    const [more, setMore] = useState(false);
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
    const [specs, setSpecs] = useState([]);
    const [specsInput, setSpecsInput] = useState({
        title: '',
        description: ''
    });


    const handleSpecsChange = (e) => {
        setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
    }
    const addSpecs = () => {
        if (!specsInput.title.trim() || !specsInput.description.trim()) return;
        setSpecs([...specs, specsInput]);
        setSpecsInput({ title: '', description: '' });
    }
    const handleChange = ({ currentTarget: input }) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, des, stock, price, brand, category, subcategory, discountprice } = inputs;
        const data = { name, des, stock, price, brand, category, subcategory, images, specs, fulldes, discountprice, warranty };
        if (!name || !des || !stock || !price || !brand || !category || !subcategory || !images || !specs) return {};
        createProducts(data).unwrap()
            .then((payload) => {
                setImages('');
                setInputs({ name: '', des: '', stock: '', price: '', brand: '', category: '', subcategory: '', fulldes: '', discountprice: '' });
                setSpecs([]);
                setWarranty(false);
                setMore(false)
            })
            .catch((error) => console.error('rejected', error.data.msg));
    };
    return (
        <>
            <DashHeeder />
            <div className='flex'>
                <Sidebar />
                <div className='container max-w-full px-1 lg:ml-80 mt-24'>
                    {error && <Danger error={error.data.msg} className={'container my-5'} />}
                    {isSuccess && <Success error={'Product Upload Successfully'} className={'container max-w-full my-5'} />}
                    <div className='container px-0 max-w-[130rem]'>
                        <p className='text-xl xl:text-4xl font-bold font-Roboto ml-3 xl:ml-8 text-gray-600 py-5'>Add New Product</p>
                        <form onSubmit={handleSubmit} id='submit' className='px-5 xl:px-6 rounded-xl py-8 h-full border xl:border-none'>
                            <div className='grid grid-cols-1 xl:grid-cols-3 xl:gap-8'>
                                <div className='rounded-lg xl:border xl:py-5 lg:px-5 xl:px-6 xxl:px-10'>
                                    <p className='my-4 font-serif text-lg'>Add Images</p>
                                    <AddImage onChange={loadFile} IsMultiple={true} Hight={'h-64'} />
                                    {images && images.map((image, index) => (
                                        <PreviewImege img={image} mykey={index} onClick={() => setImages(images.filter((e) => e !== image))} />
                                    ))}
                                </div>
                                <div className={more ? 'xl:border rounded-lg lg:px-5 xl:px-10 col-span-2' : 'xl:border rounded-lg lg:px-5 xl:px-10 col-span-2'}>
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
                                    <label className='text-sm py-3 font-light font-serif text-gray-500'>Brief Description</label>
                                    <textarea onChange={handleChange} value={inputs.des} name='des' className='inputfield w-full h-52 resize-none' cols='10' />
                                    <div>
                                        <label className='text-sm py-3 font-light font-serif text-gray-500'>Quentity in stock</label>
                                        <input onChange={handleChange} value={inputs.stock} name='stock' className='inputfield w-full' type='number' placeholder='Available Pieces' />
                                        <label className='text-sm py-3 font-light font-serif text-gray-500'>Brand</label>
                                        <select onChange={handleChange} value={inputs.brand} name='brand' className="inputfield w-full">
                                            <option value=''> --- Choose One --- </option>
                                            {Brand &&
                                                Brand?.map((cat) => (
                                                    <option key={cat._id} value={cat._id}>{cat.brand}</option>
                                                ))}
                                        </select>
                                    </div>
                                    <Category onChange={handleChange} valuecat={inputs.category} valuesub={inputs.subcategory} />
                                    <div className='flex gap-4 py-5'>
                                        <p>Add More Features ?</p>
                                        <input type='checkbox' onChange={() => setMore(!more)} />
                                    </div>
                                    {!more &&
                                        <button type='submit' className='btn-success xl:!w-60' disabled={isLoading} form='submit'>
                                            {isLoading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'><ImSpinner7 /> </span> : 'Submit'}</button>
                                    }
                                </div>
                            </div>
                            {more &&
                                <div className='xl:border mt-5 rounded-lg lg:px-5 xl:px-10 py-5'>
                                    <p className='mb-5 text-base font-Rubik text-gray-500 font-light'>This part is an optainal for product , you can apply all field or just one</p>
                                    <label className='text-sm py-3 font-light font-serif text-gray-500'>Set Old Price </label>
                                    <input onChange={handleChange} value={inputs.discountprice} name='discountprice' min='0' className='inputfield w-full' type='number' placeholder='Price in EG' />
                                    <label className='text-sm py-3 font-light font-serif text-gray-500'>Full Description</label>
                                    <div className='my-4'>
                                        <Editor
                                            value={fulldes}
                                            onChange={(fulldes) => setFullDes(fulldes)} />
                                    </div>
                                    <label className='text-sm mb-2 font-light font-serif text-gray-500 py-4'>Specifications</label>
                                    <div className='border px-4 rounded-xl py-3 mt-3'>
                                        {specs?.map(spic => (
                                            <div className='flex gap-5'>
                                                <input className="inputfield w-full" defaultValue={spic.title} disabled />
                                                <input className="inputfield w-full" defaultValue={spic.description} disabled />
                                                <button onClick={() => setSpecs(specs => specs.filter(t => t !== spic))}><BsTrash /></button>
                                            </div>
                                        ))
                                        }
                                        <div className=' gap-5 items-center'>
                                            <label className='text-sm py-3 font-light font-serif text-gray-500'>Title of Specification</label>
                                            <div className='flex gap-5'>
                                                <input className="inputfield w-full" onChange={handleSpecsChange} value={specsInput.title}
                                                    type="text" name='title' placeholder="Enter a title for a specification …" />
                                                <button type='button' onClick={() => addSpecs()} className="border rounded-lg px-4 hover:bg-gray-200 focus:bg-gray-300" >+</button>
                                            </div>
                                            <label className='text-sm py-3 font-light font-serif text-gray-500'>Description of Specification</label>
                                            <textarea onChange={handleSpecsChange} value={specsInput.description} name='description' className='inputfield w-full h-52 resize-none' cols='10' />
                                        </div>
                                    </div>
                                    <div className='flex gap-4 py-5 pb-1'>
                                        <p className='text-base font-serif font-medium'>Apply Warranty ?</p>
                                        <input type='checkbox' onChange={() => setWarranty(!warranty)} />
                                    </div>
                                    <button type='submit' className='btn-success xl:!w-60' disabled={isLoading} form='submit'>
                                        {isLoading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin cursor-progress'><ImSpinner7 /> </span> : 'Submit'}</button>
                                </div>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct
