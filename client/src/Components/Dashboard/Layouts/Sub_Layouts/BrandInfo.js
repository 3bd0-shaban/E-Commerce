import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FeaturesAction } from '../../../../Redux/Slices/FeaturesSlice';
import { Delete_Brand, Fetch_Brand_Details } from './../../../../Redux/Actions/BrandAction';
import { CgPushLeft } from 'react-icons/cg';
import { AddImage, ModalConfirm } from '../../../Exports';

import PreviewImege from './PreviewImege';
const BrandInfo = (props) => {
    const dispatch = useDispatch();

    const { BrandDetails } = useSelector((state) => state.Brand);
    const { SideBrandInfo, IsModalConfirm } = useSelector(state => state.Features)
    useEffect(() => {
        dispatch(Fetch_Brand_Details(props.id));
    }, [dispatch, props.id]);
    const [image, setImage] = useState();
    const [addimage, setAddImage] = useState();
    const [newimage, setNewImage] = useState();
    const handleimage = () => {
        setImage();
        setAddImage(<AddImage />);
    }
    const loadFile = (e) => {
        for (const file of e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setNewImage(reader.result);
            }
        }
    }
    const Handle_Delete = () => {
        const id = BrandDetails._id
        dispatch(Delete_Brand(id));
    }

    useEffect(() => {
        setImage(BrandDetails.image && BrandDetails.image.url)

    }, [BrandDetails.image, setImage]);
    return (
        SideBrandInfo &&
        <>
            {IsModalConfirm && <ModalConfirm onAgree={Handle_Delete} Message={'Are you sure you want to delete this Brand?'} />}
            <div onClick={() => dispatch(FeaturesAction.Show_SideBrandInfo(false))} className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity z-20"></div>
            <div className='h-screen w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] xxl:w-[30%] z-30 bg-white shadow-xl fixed right-0 top-0 overflowy-y-auto '>
                <div className='py-2 pt-3 bg-[#F6F8F9] px-16 flex items-center justify-between'>
                    <button className='text-gray-600 hover:bg-gray-200 focus:bg-gray-300 p-3 px-3.5 duration-200 rounded-full' onClick={() => dispatch(FeaturesAction.Show_SideBrandInfo(false))}><CgPushLeft style={{ fontSize: '2rem' }} /></button>
                    <button className='bg-blue-500 rounded-md text-base font-semibold text-white px-4 py-2 mb-3 focus:bg-blue-400'>Save Changes</button>
                </div><hr />
                <div className='mx-16'>
                    <p className='text-2xl font-semibold font-serif py-5'>Edit Brand</p>
                    <label className='text-sm py-3 font-light font-serif text-gray-500'>Brans Name</label>
                    <input defaultValue={BrandDetails.brand} name='brand' className='inputfield w-full' type='text' placeholder='Product name' />
                    {addimage &&
                        <>
                            <label className='text-sm font-light font-serif text-gray-500 mb-3'>Upload Image</label>
                            <AddImage onChange={loadFile} Hight={'!h-32'} IsMultiple={false} />
                        </>}
                    {image ? <PreviewImege onClick={handleimage} img={image} /> : newimage && <PreviewImege onClick={() => setNewImage()} img={newimage} />}
                    <div className='flex items-center my-6'>
                        <label className='text-[.92rem] w-1/4 font-light font-serif text-gray-500'>Description</label>
                        <hr className='w-full border-t-2 bg-gray-300'></hr>
                    </div>
                    <p className='text-sm text-gary-600 font-poppins'>{BrandDetails.des}</p>
                    <div className='flex items-center my-10'>
                        <label className='text-[.92rem] w-1/4 font-light font-serif text-gray-500'>Danger Zone</label>
                        <hr className='w-full border-t-2 bg-gray-300'></hr>
                    </div>
                    <p className='mb-5 text-base font-Rubik text-gray-500 font-light'>Onece you delete this Brand customers will not able to access it again, also all sub categories will be lost</p>
                    <button onClick={() => dispatch(FeaturesAction.Show_ModalConfirm(true))} className='bg-red-100 rounded-md text-base font-semibold text-red-400 px-4 py-2 mb-3 focus:bg-red-200'>Delete Brand</button>
                </div>
            </div>
        </>
    )
}

export default BrandInfo
