import React, { useState } from 'react';
import { Header } from '../../Exports';
import { useDeleteProductInWhitelistMutation, useGetWhitelistQuery } from '../../../Redux/APIs/WhiteListApi';
import { ToastContainer, toast } from 'react-toastify';
import { useTitle } from '../../Exports'

import 'react-toastify/dist/ReactToastify.css';
const WhiteList = () => {
    const [id, setId] = useState('');
    useTitle('White List')
    const { data: Products, isLoading: loading } = useGetWhitelistQuery() || {};
    const [deleteProductInWhitelist] = useDeleteProductInWhitelistMutation();
    const HandleDelete = () => {
        deleteProductInWhitelist(id).unwrap()
            .then((payload) => toast.success(payload.msg))
            .catch((error) => toast.error(error.data.msg));
    }
    return (
        <div>
            <Header />
            <ToastContainer position="bottom-center" closeOnClick autoClose={1200} hideProgressBar={true} limit={1} />
            <div className='col-span-2 select-none bg-[#F6F8F9]'>
                <div className='container max-w-6xl'>
                    <div className=''>
                        <div className='flex justify-center py-4'>
                            <p className='text-3xl font-medium font-Permanent'>Shopping Cart</p>
                        </div>
                    </div>
                    <div>
                        {loading ? <p className='text-3xl font-bold flex justify-center items-center'>loading</p> :
                            Products?.whiteList?.map((child, index) => (
                                <div key={index} className='bg-white shadow rounded-xl relative py-2 my-5'>
                                    <div className='flex'>
                                        <img draggable={false} className='h-52 m-2 object-cover' src={child._id.images[0].url} alt=''></img>
                                        <div className=''>
                                            <p className='py-3 text-lg'>{child._id.Name}</p>
                                            <div className='absolute bottom-0 mb-10'>
                                                <div className='flex items-center gap-3 py-4'>
                                                    <label>Select Quentity</label>
                                                </div>
                                                <div className='flex gap-3'>
                                                    <button onClick={() => { setId(child._id._id); HandleDelete() }} className='text-teal-800 font-semibold'>Remove</button>
                                                    <div className='flex items-center gap-1 text-orange-800 '>
                                                        <button className='font-semibold'>Add to white list</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default WhiteList
