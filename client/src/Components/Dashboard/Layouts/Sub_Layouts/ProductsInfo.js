import React, {  useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useGetProductsDetailsQuery } from '../../../../Redux/APIs/ProductsApi';
import { FeaturesAction } from '../../../../Redux/Slices/FeaturesSlice';
import { HiOutlineCloudUpload } from 'react-icons/hi';
const ProductsInfo = (props) => {
    const id = props.id
    const { sideProductInfo } = useSelector(state => state.Features);
    const { data: productDetails } = useGetProductsDetailsQuery(id);
    const dispatch = useDispatch();// eslint-disable-next-line
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
    return (
        sideProductInfo &&
        <>
            <div onClick={() => dispatch(FeaturesAction.Show_sideProductInfo(false))} className="fixed inset-0 bg-black/20 z-20"></div>
            <div className='h-screen w-full sm:w-[70%] md:w-[60%] lg:w-[60%] xl:w-[50%] xxl:w-[35%] z-30 bg-white shadow-xl fixed right-0 top-0 overflowy-y-auto'>
                <div className='px-16'>
                    <p className='mt-8 text-xl font-bold text-gray-900'>{productDetails.name}</p>
                    <div className="flex justify-center items-center w-full">
                        <label className="flex flex-col justify-center items-center w-full h-44 mb-3 bg-gray-50 rounded-lg border border-slate-400 border-dashed cursor-pointer">
                            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                <HiOutlineCloudUpload style={{ fontSize: '3.5rem', color: 'rgb(156 163 175)' }} />
                                <p className="mb-2 text-sm text-gray-500"><span className="text-blue-500 font-semibold">Click here to upload images</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input onChange={loadFile} name='image' accept='image/*' id="dropzone-file" type="file" className="hidden" />
                        </label>
                    </div>
                    <p>{productDetails.rating}</p>
                </div>
            </div>
        </>
    )
}

export default ProductsInfo
