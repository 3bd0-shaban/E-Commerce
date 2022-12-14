import moment from 'moment';
import React from 'react'
import { AiOutlineMail } from 'react-icons/ai';
import { BsPerson, BsTelephone } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useGetOrderDetailsQuery } from '../../../../../Redux/APIs/OrderApi';
import { FeaturesAction } from './../../../../../Redux/Slices/FeaturesSlice';
import { ModalConfirm } from '../../../../Exports';

const PendingSideBar = (props) => {
    const { sideOrderInfo, IsModalConfirm } = useSelector(state => state.Features);
    const dispatch = useDispatch();
    const { data: OrderDetails } = useGetOrderDetailsQuery(props.id) || {};
    return (
        <>
            {sideOrderInfo &&
                <>
                    {IsModalConfirm && <ModalConfirm onAgree={'Handle_Delete'} Message={'Are you sure you want to delete this Brand?'} />}
                    <div onClick={() => dispatch(FeaturesAction.Show_sideOrderInfo(false))} className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity z-20"></div>
                    <div className='h-screen w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] xxl:w-[30%] z-30 bg-white shadow-xl fixed right-0 top-0  '>
                        <div className='px-10 py-10'>
                            <div className='flex justify-between items-center'>
                                <p className='text-3xl fone-semibold text-gray-700 font-Rubik'>Customer</p>
                                <p className='font-semibold text-gray-600'>Placed On {moment(OrderDetails?.createdAt).format('Do MMMM YYYY')}</p>
                            </div>
                            <div className='space-y-4 py-5 '>
                                <div className='flex gap-3 items-center'>
                                    <span><BsPerson /></span>
                                    <p className='text-xl font-semibold text-gray-600'>Name :<span className='text-base ml-3'>{`${OrderDetails?.user.firstname} ${OrderDetails?.user.lastname}`}</span></p>
                                </div>
                                <div className='flex gap-3 items-center'>
                                    <span><BsTelephone /></span>
                                    <p className='text-xl font-semibold text-gray-600'>Phone :<span className='text-base ml-3'>{OrderDetails?.PhoneNumber}</span></p>
                                </div>
                                <div className='flex gap-3 items-center'>
                                    <span className='text-xl'><AiOutlineMail /></span>
                                    <p className='text-xl font-semibold text-gray-600'>Email :<span className='text-base ml-3'>{OrderDetails?.user.email}</span></p>
                                </div>
                            </div>
                        </div><hr />
                        <div className='bg-[#F8F8F8] h-full px-10'>
                            <div>
                                <div className='flex gap-5 py-6 items-center'>
                                    <p className='text-xl font-bold font-serif w-[30%]'>Order Status :</p>
                                    <select className='outline-none pr-10 pl-3 py-2 rounded-md'>
                                        <option value='Beneding'>Beneding</option>
                                        <option value='Beneding'>Shipped</option>
                                        <option value='Beneding'>Delvered</option>
                                    </select>
                                </div>
                                <div className='flex gap-5 py-6 items-center'>
                                    <p className='text-xl font-bold font-serif w-[30%]'>Payment Status :</p>
                                    <select className='outline-none pr-10 pl-3 py-2 rounded-md'>
                                        <option value='Beneding'>Baid</option>
                                        <option value='Beneding'>Not yet baid</option>
                                    </select>
                                </div><hr />
                            </div>
                            <div className='py-6'>
                                <p className='text-2xl font-semibold py-2'>Billing Address</p>
                                <div className='space-y-2'>
                                    <p className='font-semibold text-lg text-gray-600'>Address :<span>{OrderDetails?.address?.city}</span></p>
                                    <p className='font-semibold text-lg text-gray-600'>City :<span></span></p>
                                    <p className='font-semibold text-lg text-gray-600'>State :<span></span></p>
                                    <p className='font-semibold text-lg text-gray-600'>ZipCode :<span></span></p>
                                    <p className='font-semibold text-lg text-gray-600'>Phone :<span></span></p>
                                </div>
                            </div><hr />
                            <div className='py-6'>
                                <p className='text-2xl font-semibold py-2'>Billing Address</p>
                                {OrderDetails?.orderitems &&
                                    OrderDetails?.orderitems.map((product) => (
                                        <div key={product?.product_Id._id}>
                                            <p >{product?.product_Id.name}</p>
                                        </div>
                                    ))}
                            </div>
                            <div className='flex items-center mt-10 mb-5'>
                                <label className='text-[.92rem] w-1/4 font-light font-serif text-gray-500'>Danger Zone</label>
                                <hr className='w-full border-t-2 bg-gray-300'></hr>
                            </div>
                            <p className='mb-5 text-base font-Rubik text-gray-500 font-light'>Onece you delete this category customers will not able to access it again, also all sub categories will be lost</p>
                            <button onClick={() => dispatch(FeaturesAction.Show_ModalConfirm(true))}
                                className='bg-red-100 rounded-md text-base font-semibold text-red-400 px-4 py-2 mb-3 focus:bg-red-200'>Cancel Order</button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default PendingSideBar
