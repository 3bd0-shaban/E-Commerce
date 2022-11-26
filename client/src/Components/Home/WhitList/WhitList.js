import React, { useEffect } from 'react';
import { Header } from '../../Exports';
import { useDispatch, useSelector } from 'react-redux';
import { Fetch_Products_In_WhiteList, Delete_Specific_Item_In_WhiteList } from '../../../Redux/Actions/WhiteListAction';
const WhiteList = () => {
    const dispatch = useDispatch();
    const { Products, loading } = useSelector((state) => state.WhiteList);
    useEffect(() => {
        dispatch(Fetch_Products_In_WhiteList())
    }, [dispatch])
    return (
        <div>
            <Header />
            <div className='col-span-2 bg-[#F6F8F9]'>
                <div className='container max-w-6xl'>
                    <div className=''>
                        <div className='flex justify-center py-4'>
                            <p className='text-3xl font-medium font-Permanent'>Shopping Cart</p>
                        </div>
                    </div>
                    <div>
                        {loading ? <p className='text-3xl font-bold flex justify-center items-center'>loading</p> :
                            Products.whiteList?.map((child) => (
                                <div>
                                    <div key={child._id._id} className='bg-white shadow rounded-xl relative py-2 my-5'>
                                        <div className='flex'>
                                            <img className='h-52 m-2 object-cover' src={child._id.images[0].url} alt=''></img>
                                            <div className=''>
                                                <p className='py-3 text-lg'>{child._id.Name}</p>
                                                <div className='absolute bottom-0 mb-10'>
                                                    <div className='flex items-center gap-3 py-4'>
                                                        <label>Select Quentity</label>
                                                    </div>
                                                    <div className='flex gap-3'>
                                                        <button onClick={() =>{ const productId = child._id._id; dispatch(Delete_Specific_Item_In_WhiteList(productId))} } className='text-teal-800 font-semibold'>Remove</button>
                                                        <div className='flex items-center gap-1 text-orange-800 '>
                                                            <button className='font-semibold'>Add to white list</button>
                                                        </div>
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
