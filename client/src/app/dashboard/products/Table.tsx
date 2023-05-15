'use client';
import ShowRating from '@Components/Layouts/ShowRating';
import { useGetProductsQuery } from '@Redux/APIs/ProductsApi';
import moment from 'moment';
import Image from 'next/image';
import { FC } from 'react'
import { AiOutlineEye } from 'react-icons/ai';
import { BsCheck, BsX } from 'react-icons/bs';

interface TableProps {

}

const Table: FC<TableProps> = ({ }) => {
    const { data } = useGetProductsQuery({ page: 1 });
    const { products } = data || {}
    return (
        <>
            {products?.map((item, index) => (
                <tbody key={item?._id}>
                    <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 whitespace-nowrap">
                        <td className="w-4 p-4 font-medium">{index + 1}</td>
                        <td className="flex items-center px-3 pr-10 py-4 font-medium text-gray-900 w-96">
                            {item.images.length > 0 &&
                                <Image
                                    height={500}
                                    width={500}
                                    className="w-12 h-12 rounded-full"
                                    src={item?.images[0].url}
                                    alt=""
                                />
                            }
                            <div className="pl-3 ellipse-2">
                                <div className="text-sm text-orange-600 font-medium dark:text-gray-200 ">{item?.name}</div>
                                <div className="font-semibold text-teal-600 dark:text-slate-500">{item?.price} EGP</div>
                            </div>
                        </td>
                        <td className='px-6 py-4'>{item._id}</td>
                        <td className="px-6 py-4">
                            <div className='flex gap-2 items-center'>
                                <ShowRating Rating={item.rating as number} />
                                <p>({item?.rating?.toFixed(1)})</p>
                            </div>
                        </td>
                        <td className="px-6 py-4">{item?.category}</td>
                        <td className="px-6 py-4">
                            <button
                                aria-label='gender'
                                className="font-medium text-blue-600 hover:underline">
                                {item?.brand}
                            </button>
                        </td>
                        <td className="px-6 py-4">
                            <button
                                aria-label='createdAt'
                                className="font-medium text-blue-600 hover:underline">
                                {moment(item?.createdAt).format("MMM Do YY")}
                            </button>
                        </td>
                        <td className="px-6 py-4">
                            <button
                                aria-label='fees'
                                className="font-medium text-blue-600 hover:underline">
                                {item?.price}
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
            ))}
        </>
    )
}

export default Table