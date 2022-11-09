import React, { useEffect } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Sidebar, DashHeeder } from '../../Exports';
import { Danger } from '../../../Components/Alerts';
import { RiMoreFill } from 'react-icons/ri'
import { Helmet } from 'react-helmet-async';
import { FetchAllUsers } from './../../../Redux/Actions/AuthAction';
const Dashboard = () => {
    const { id } = useParams();
    const { AllUsers, loading, error } = useSelector((state) => state.allusers);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(FetchAllUsers());
    }, [dispatch]);
    const Delete_User = async () => {
        dispatch(Delete_User(id));
    };
    return (
        <>
            <Helmet>
                <title>All Users - Dashboard</title>
            </Helmet>
            <DashHeeder />
            <div className='flex'>
                <Sidebar />
                <div className='container lg:ml-80 mt-24'>
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
                                <tr>
                                    <th scope="col" className="py-3 w-2"></th>
                                    <th scope="col" className="py-3 px-6 w-[30%] ">user Name</th>
                                    <th scope="col" className="py-3 px-6">Is Admin</th>
                                    <th scope="col" className="py-3 px-6">Amoungt</th>
                                    <th scope="col" className="py-3 px-6">Date</th>
                                    <th scope="col" className="py-3 px-6"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? <p className='mx-auto text-5xl font-Alegreya flex items-center'>Loading</p>
                                    : error ?
                                        <Danger error={error} className={'container max-w-7xl mx-auto my-5 w-[50vw]'} /> :
                                        AllUsers.map(user =>
                                            <tr className="bg-white border-b hover:bg-gray-50" key={user._id}>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center">
                                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" />
                                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                                    </div>
                                                </td>
                                                <td className="flex items-center py-4 ">
                                                    <img className="w-10 h-10 rounded-full" src={user.image} alt="" />
                                                    <div className="pl-3">
                                                        <div className="text-base font-semibold  overflow-x-hidden">{user.username}</div>
                                                        <div className="font-normal text-gray-500">{user.email}$</div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 w-[20%]">{user.isAdmin}</td>
                                                <td className="py-4 px-6">{user.isAdmin}</td>
                                                <td className="py-4 px-6">{user.createdAt}</td>
                                                <td className="py-4 px-6 flex items-center">
                                                    <Link onClick={Delete_User} className="font-medium text-blue-600 text-3xl hover:underline mr-3"><RiMoreFill /></Link>
                                                </td>
                                            </tr>
                                        )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Dashboard
