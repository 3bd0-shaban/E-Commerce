'use client';
import ShowRating from '@Components/Layouts/ShowRating';
import { useGetAllOrderQuery } from '@Redux/APIs/OrderApi';
import moment from 'moment';
import Image from 'next/image';
import { FC } from 'react'
import { AiOutlineEye } from 'react-icons/ai';
import { BsCheck, BsX } from 'react-icons/bs';

interface TableProps {

}

const Table: FC<TableProps> = ({ }) => {
    const { data } = useGetAllOrderQuery({ page: 1 });
    const { orders } = data || {};
    return (
        <>
            {orders?.map((item, index) => {
                const cancelled = item.status === 'Cancelled';
                const notProcced = item.status === 'Not processed';
                const delevered = item.status === 'Delivered';
                const shipped = item.status === 'Shipped';
                const processing = item.status === 'Processing';
                return (
                    <tbody key={item?._id}>
                        <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 whitespace-nowrap">
                            <td className="w-4 p-4 font-medium">{index + 1}</td>
                            <td className="flex items-center px-3 pr-10 py-4 font-medium text-gray-900">
                                <div className="pl-3 ellipse-2">
                                    <div className="text-sm font-medium dark:text-gray-200 ">{`${item?.user?.firstname} ${item?.user?.lastname}`}</div>
                                    <div className="font-light text-gray-500 dark:text-slate-500">{item?.address?.city}</div>
                                </div>
                            </td>
                            <td className='px-6 py-4 text-gray-900 dark:text-slate-300'>{item._id}</td>
                            <td className="px-6 py-4">
                                <div className="font-medium text-gray-900 dark:text-slate-500">{item?.PhoneNumber}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="font-semibold text-teal-600 dark:text-slate-500">{item?.totalPrice} EGP</div>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    aria-label='gender'
                                    className={`font-semibold rounded-md text-sm p-2 px-4  ${item.CashOnDelivery ? 'text-green-600 bg-green-200' : 'text-red-600 bg-red-200'}`}>
                                    {item?.CashOnDelivery ? 'true' : 'false'}
                                </button>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    aria-label='createdAt'
                                    className="font-medium text-blue-600 hover:underline">
                                    {moment(item?.createdAt).fromNow()}
                                </button>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    aria-label='fees'
                                    className={`font-medium ${cancelled ? 'text-red-500' : notProcced ? 'text-blue-500' : delevered ? 'text-orange-500' : shipped && 'text-green-500'}`}>
                                    {item?.status}
                                </button>
                            </td>
                            <td className="space-x-2 px-4">
                                <button
                                    aria-label='view patient'
                                    className="bg-sky-100 active:bg-sky-200 active:shadow-blue-300 text-sky-400 rounded-full p-2 shadow-blue-200 shadow-md border border-blue-200">
                                    <AiOutlineEye size={15} />
                                </button>
                                <button
                                    aria-label='approve'
                                    className="bg-green-100 active:bg-green-200 active:shadow-green-300 text-green-400 rounded-full p-2 shadow-green-200 shadow-md border border-blue-200">
                                    <BsCheck size={15} />
                                </button>
                                <button
                                    aria-label='cancel'
                                    className="bg-red-100 active:bg-red-200 active:shadow-red-300 text-red-400 rounded-full p-2 shadow-red-200 shadow-md border border-red-200">
                                    <BsX size={15} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                )
            })}
        </>

    )
}

export default Table