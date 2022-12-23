import React, { useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Sidebar, DashHeeder } from '../../Exports';
import { Danger } from '../../../Components/Alerts';
import { Helmet } from 'react-helmet-async';
import { FeaturesAction } from './../../../Redux/Slices/FeaturesSlice';
import UserInfo from './../Layouts/Sub_Layouts/UserInfo';
import moment from 'moment';
import { useGetAllUsersQuery } from '../../../Redux/APIs/AuthApi';
const Dashboard = () => {
    const [id, setId] = useState('');
    const { data: AllUsers, isFetching, error } = useGetAllUsersQuery() || {};
    const dispatch = useDispatch();
    return (
        <>
            <Helmet>
                <title>All Users - Dashboard</title>
            </Helmet>
            <DashHeeder />
            {<UserInfo id={id} />}
            <div className='flex'>
                <Sidebar />
                <div className='container max-w-full lg:ml-80 mt-24'>
                    {isFetching ? <p className='mx-auto text-5xl font-Alegreya flex items-center'>Loading</p>
                        : error ?
                            <Danger error={error.data.msg || 'error hanpened while featching users'} className={'container max-w-full my-5 xl:w-[50vw]'} />
                            :
                            <>
                                <p className='text-5xl font-Rubik '>All Users</p>
                                <div className='flex gap-6 font-light text-xl mt-5'>
                                    <Link className='border-b-transparent hover:border-b-black'>Customers</Link>
                                    <Link className='border-b-transparent hover:border-b-black'>Admins</Link>
                                    <Link className='border-b-transparent hover:border-b-black'>Deliveler</Link>
                                    <Link className='border-b-transparent hover:border-b-black'>All</Link>
                                </div>
                                <hr className='mt-3 h-[2px] bg-gray-400 rounded' />
                                <div className='flex justify-end pr-2 md:pr-10 mt-5'>
                                    <form >
                                        <div className="relative">
                                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none font-extralight text-2xl text-gray-400">
                                                <MdOutlineSearch />
                                            </div>
                                            <input type="search" className="Searchbar !border" placeholder="Search" required="" />
                                        </div>
                                    </form>
                                </div>
                                <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">

                                    <table className="w-full text-sm text-left text-gray-500 mt-5">
                                        <thead className="text-xs text-gray-700 uppercase border-b-2 py-3">
                                            <tr className='whitespace-nowrap'>
                                                <th scope="col" className="py-3 px-6 w-[30%] ">user Name</th>
                                                <th scope="col" className="py-3 px-6">Email</th>
                                                <th scope="col" className="py-3 px-6">Admin</th>
                                                <th scope="col" className="py-3 px-6">Goined At</th>
                                            </tr>
                                        </thead>
                                        <tbody onClick={() => dispatch(FeaturesAction.Show_sideUserInfo())} >
                                            {AllUsers?.map(user => (
                                                <tr onClick={() => setId(user._id)} className="bg-white border-b hover:bg-gray-50 cursor-pointer" key={user._id} >
                                                    <td className="flex items-center py-4 ">
                                                        <div className="w-14 h-14 bg-red-400 text-white flex gap-1 items-center justify-center text-2xl font-serif font-bold mx-2 rounded-full">{user.firstname.charAt(0)}
                                                            <span> {user.lastname.charAt(0)}</span>
                                                        </div>
                                                        <div className="pl-3">
                                                            <div className="text-base font-semibold  overflow-x-hidden">{user.firstname}<span> {user.lastname}</span></div>
                                                            <div className="font-normal text-gray-500">{user.email}</div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 w-[20%]">{user.email}</td>
                                                    {user.isAdmin ? <td className="py-4 px-6 w-[20%]">Admin</td> :
                                                        <td className="py-4 px-6 w-[20%]">Customer</td>}
                                                    <td className="py-4 px-6">{moment(user.createdAt).format('Do MMMM YYYY')}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                    }

                </div>
            </div>
        </>

    )
}

export default Dashboard
