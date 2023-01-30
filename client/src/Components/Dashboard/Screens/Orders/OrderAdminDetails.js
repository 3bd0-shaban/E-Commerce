import moment from 'moment';
import { BsFillBookmarksFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useCancelOrderMutation, useChangeOrderStatusMutation, useGetOrderDetailsQuery } from '../../../../Redux/APIs/OrderApi';
import { FeaturesAction } from '../../../../Redux/Slices/FeaturesSlice';
import { ModalConfirm, Sidebar, DashHeeder } from '../../../Exports';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';
import { MdBorderColor } from 'react-icons/md';
import { RiSave2Fill } from 'react-icons/ri';
import { HiTruck } from 'react-icons/hi';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { AnimRoutes, AnimSlideLeft } from './../../../../Animation/Exports';
import { useState } from 'react';
const OrderAdminDetails = () => {
    const { IsModalConfirm } = useSelector(state => state.Features);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [status, setStatus] = useState('Shipped');
    const { data: OrderDetails } = useGetOrderDetailsQuery(id) || {};
    const [CancelOrder] = useCancelOrderMutation();
    const [changeOrderStatus] = useChangeOrderStatusMutation();
    const cancelOrder = () => {
        CancelOrder(id).unwrap()
            .then((payload) => toast.success(payload.msg))
            .catch((error) => toast.error(error.data.msg));
        dispatch(FeaturesAction.Show_ModalConfirm(false))
    }
    const ChangeStatus = () => {
        const data = { status }
        console.log(status)
        changeOrderStatus({ data, id }).unwrap()
            .then((payload) => toast.success(payload.msg))
            .catch((error) => toast.error(error.data.msg));
    }
    return (
        <>
            <ToastContainer position="bottom-center" closeOnClick autoClose={1200} hideProgressBar={true} limit={1} />
            {IsModalConfirm && <ModalConfirm onAgree={cancelOrder} Message={'Are you sure you want to cancel this order?'} />}
            <DashHeeder />
            <div className='flex'>
                <Sidebar />
                <div className='container max-w-full lg:ml-80 mt-24'>
                    <div className='flex gap-1 items-center text-gray-500 font-medium'>
                        <MdBorderColor />
                        <Link to='/dashboard/orders' className=' hover:underline'>Package</Link>
                        <BiChevronRight size={25} />
                        <p>Order</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-6 gap-5 mt-5'>
                        <motion.div
                            variants={AnimRoutes}
                            initial='initial'
                            animate='shown'
                            exit='exit'
                            className='border shadow-md md:col-span-4 p-5 rounded-xl'>
                            <p className='font-semibold text-xl text-gray-700'>Package</p>
                            <div className='flex gap-3 items-center'>
                                <p className='text-base font-medium text-gray-700'>Pkg - {OrderDetails?._id}</p>
                                <p className='px-5 bg-red-200 text-red-400 rounded-xl py-1 font-bold text-sm'>{OrderDetails?.status}</p>
                            </div><hr className='my-5' />
                            <div className='grid grid-cols-2 gap-y-5'>
                                <div>
                                    <p className='text-xl font-bold font-serif text-gray-700 truncate'>Ship to </p>
                                    <div className='font-medium text-gray-500 text-lg'>
                                        <p>Floor :{OrderDetails?.address?.floor}</p>
                                        <p>Street :{OrderDetails?.address?.street}</p>
                                        <p>Area :{OrderDetails?.address?.area}</p>
                                        <p>zipCode :{OrderDetails?.address?.zipCode}</p>
                                        <p>City :{OrderDetails?.address?.city}</p>
                                        <p>State :{OrderDetails?.address?.state}</p>
                                        {OrderDetails?.address?.nearestlandmark &&
                                            <p>Nearst Landmark :{OrderDetails?.address?.nearestlandmark}</p>
                                        }
                                    </div>
                                </div>
                                <div>
                                    <p className='text-xl font-bold font-serif text-gray-700 truncate'>Package Date</p>
                                    <p className='text-gray-600'>{moment(OrderDetails?.createdAt).calendar()}</p>
                                    <p className='text-xl font-bold font-serif text-gray-700 truncate'>Total Quentity</p>
                                    <p className='text-gray-600'>{OrderDetails?.orderitems?.length}</p>
                                    <p className='text-xl font-bold font-serif text-gray-700 truncate'>Total Price</p>
                                    <p className='text-gray-600 font-semibold text-sm'>{OrderDetails?.totalPrice} EGP</p>
                                    <select className='outline-none pr-10 border pl-3 py-2 rounded-md' onChange={ChangeStatus} value={status}>
                                        <option value='Not processed'>Beneding</option>
                                        <option value='Shipped'>Shipped</option>
                                        <option value='Delivered'>Delvered</option>
                                    </select>
                                </div>
                                <div>
                                    <p className='text-xl font-bold font-serif text-gray-700 truncate'>Sill to </p>
                                    <div className='font-medium text-gray-500 text-lg whitespace-nowrap'>
                                        <p>Email :{OrderDetails?.user?.email}</p>
                                        <p>Full name : {`${OrderDetails?.user?.firstname} ${OrderDetails?.user?.lastname}`}</p>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div className="overflow-x-auto relative shadow-md rounded-xl sm:rounded-lg mt-5 hideScrollBare">
                                    <table className="w-full text-sm text-left text-gray-500 mt-5">
                                        <thead className="text-xs text-gray-700 uppercase border-b-2 py-3">
                                            <tr className='whitespace-nowrap'>
                                                <th scope="col" className="py-3 px-6">Item Name</th>
                                                <th scope="col" className="py-3 px-6">Baid ?</th>
                                                <th scope="col" className="py-3 px-6">Price</th>
                                                <th scope="col" className="py-3 px-6">Quentity</th>
                                            </tr>
                                        </thead>
                                        <tbody className='cursor-pointer' onClick={() => dispatch(FeaturesAction.Show_sideOrderInfo(true))}>
                                            {OrderDetails?.orderitems?.map(product =>
                                                <tr className="bg-white border-b hover:bg-gray-50" key={product._id} onClick={() => navigate(`/product/${product?.product_Id}`)}>
                                                    <td className="py-4 px-6 w-[20%]">{product?.product_Id?.name}</td>
                                                    {product?.CashOnDelivery ?
                                                        <td className="py-4 px-6"><span className='text-green-500 bg-green-200 rounded-lg font-semibold text-base px-5 py-2'>True</span></td>
                                                        :
                                                        <td className="py-4 px-6"><span className='text-red-500 bg-red-200 rounded-lg font-semibold text-base px-5 py-2'>False</span></td>}
                                                    <td className="py-4 px-6 text-base font-semibold">{product?.price} EGP</td>
                                                    <td className="py-4 px-6">{product?.quentity}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='flex items-center mt-10 mb-5'>
                                <label className='text-[.92rem] w-1/4 font-light font-serif text-gray-500'>Danger Zone</label>
                                <hr className='w-full border-t-2 bg-gray-300'></hr>
                            </div>
                            <p className='mb-5 text-base font-Rubik text-gray-500 font-light'>Onece you delete this category customers will not able to access it again, also all sub categories will be lost</p>
                            <button onClick={() => dispatch(FeaturesAction.Show_ModalConfirm(true))}
                                className='bg-red-100 rounded-md text-base font-semibold text-red-400 px-4 py-2 mb-3 focus:bg-red-200'>Cancel Order</button>
                        </motion.div>
                        <motion.div
                            variants={AnimSlideLeft}
                            initial='initial'
                            animate='animate'
                            exit='exit'
                            className='md:col-span-2 gap-y-5 space-y-5'>
                            <div className='border shadow-md rounded-xl p-5'>
                                <p className='font-semibold text-xl text-gray-700'>Package</p>
                                <div className='flex items-center gap-5 text-gray-500 font-semibold'>
                                    <HiTruck size={50} />
                                    <div >
                                        <p>Ship</p>
                                        <p>Ship On 25445455</p>
                                    </div>
                                </div>
                                <div className='flex justify-between w-1/2 my-4'>
                                    <div>
                                        <p className='font-medium'>Carrier</p>
                                        <p className='font-light'>DHL</p>
                                        <p className='font-medium uppercase'>Tracking</p>
                                        <p className='font-medium'>123456789</p>
                                    </div>
                                    <div>
                                        <p className='font-medium'>Shipping Charge</p>
                                        <p>200 EGP</p>
                                        <p className='font-medium'>Status</p>
                                        <p>Shipped</p>
                                    </div>
                                </div>
                                <Link className='text-red-500 font-medium hover:underline mt-5'>Delete Shippment</Link>
                            </div>
                            <div className='border shadow-md p-5 rounded-xl min-h-[35rem]'>
                                <p className='font-semibold text-xl text-gray-700'>Shipment Timeline</p>

                                <div className='mx-3 mt-5'>
                                    <ol class="relative text-gray-500 border-l border-gray-200">
                                        <li class="mb-10 ml-6">
                                            <span class="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white">
                                                <svg aria-hidden="true" class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                            </span>
                                            <h3 class="font-medium leading-tight">Personal Info</h3>
                                            <p class="text-sm">Step details here</p>
                                        </li>
                                        <li class="mb-10 ml-6">
                                            <span class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white">
                                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                                            </span>
                                            <h3 class="font-medium leading-tight">Account Info</h3>
                                            <p class="text-sm">Step details here</p>
                                        </li>
                                        <li class="mb-10 ml-6">
                                            <span class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white ">
                                                <BsFillBookmarksFill />
                                            </span>
                                            <h3 class="font-medium leading-tight">Review</h3>
                                            <p class="text-sm">Step details here</p>
                                        </li>
                                        <li class="ml-6">
                                            <span class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white">
                                                <RiSave2Fill />
                                            </span>
                                            <h3 class="font-medium leading-tight">Confirmation</h3>
                                            <p class="text-sm">Step details here</p>
                                        </li>
                                    </ol>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default OrderAdminDetails
