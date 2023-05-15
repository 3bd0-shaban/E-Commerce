'use client';
import { useGetAllUsersQuery } from '@Redux/APIs/UserApi'
import moment from 'moment';
import Image from 'next/image';
import { FC } from 'react'
import { AiOutlineEye } from 'react-icons/ai';
import { BsCheck, BsX } from 'react-icons/bs';

interface TableProps {

}

const Table: FC<TableProps> = ({ }) => {
    const { data } = useGetAllUsersQuery();
    const { users } = data || {}
    return (
        <>
            {users?.map((user, index) => (
                <tbody key={user?._id}>
                    <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 whitespace-nowrap">
                        <td className="w-4 p-4 font-medium">{index + 1}</td>
                        <th className="flex items-center px-3 pr-10 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {user.image &&
                                <Image
                                    height={500}
                                    width={500}
                                    className="w-12 h-12 rounded-full"
                                    src={user?.image.url as string}
                                    alt=""
                                />
                            }
                            <div className="pl-3">
                                <div className="text-sm font-medium dark:text-gray-200">{`${user?.firstname} ${user.lastname}`}</div>
                                <div className="font-normal text-gray-500 dark:text-slate-500">{user?.email}</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">{user?.phone}</td>
                        <td className="px-6 py-4">{user?._id}</td>
                        <td className="px-6 py-4">
                            <button
                                aria-label='gender'
                                className="font-medium text-blue-600 hover:underline">
                                {user?.isAdmin ? "admin" : "customer"}
                            </button>
                        </td>
                        <td className="px-6 py-4">
                            <button
                                aria-label='createdAt'
                                className="font-medium text-blue-600 hover:underline">
                                {moment(user?.createdAt).format("MMM Do YY")}
                            </button>
                        </td>
                        <td className="px-6 py-4">
                            <button
                                aria-label='fees'
                                className="font-medium text-blue-600 hover:underline">
                                {user?.isAdmin}
                            </button>
                        </td>
                        <td className="space-x-2">
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