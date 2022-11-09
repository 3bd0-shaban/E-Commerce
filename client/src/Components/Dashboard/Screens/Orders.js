import React, { useEffect } from 'react'
import { Sidebar, DashHeeder } from '../../Exports';
import { RiMoreFill } from 'react-icons/ri'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Danger } from '../../Alerts';
import { Helmet } from 'react-helmet-async';
import { Get_AllProducts } from './../../../Redux/Actions/ProductsAction';
const Orders = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(Get_AllProducts());
    }, [dispatch]);
    return (
        <>
            <Helmet>
                <title>All Orders - Dashboard</title>
            </Helmet>
            <DashHeeder />
            <div className='flex'>
                <Sidebar />
                <div className='container lg:ml-80 mt-24'>
                    <p className='text-5xl font-Rubik '>Orders</p>
                    <div className='flex gap-6 font-light text-xl mt-5'>
                        <Link className='border-b-transparent hover:border-b-black'>Shipping</Link>
                        <Link className='border-b-transparent hover:border-b-black'>Beneding</Link>
                        <Link className='border-b-transparent hover:border-b-black'>Rejected</Link>
                        <Link className='border-b-transparent hover:border-b-black'>All</Link>
                    </div>
                    <hr className='mt-3 h-[2px] bg-gray-400 rounded' />
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
                        <table className="w-full text-sm text-left text-gray-500 mt-5">
                            <thead className="text-xs text-gray-700 uppercase border-b-2 py-3">
                                <tr>
                                    <th scope="col" className="py-3 w-2"></th>
                                    <th scope="col" className="py-3 px-6 w-[30%] ">Product Name</th>
                                    <th scope="col" className="py-3 px-6">Customer</th>
                                    <th scope="col" className="py-3 px-6">Amoungt</th>
                                    <th scope="col" className="py-3 px-6">Date</th>
                                    <th scope="col" className="py-3 px-6"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? <p className='mx-auto text-5xl font-Alegreya flex items-center'>Loading</p> : error ? <Danger /> :
                                    products.map(product =>
                                        <tr className="bg-white border-b hover:bg-gray-50" key={product._id}>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" />
                                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <td className="flex items-center py-4 ">
                                                <img className="w-10 h-10 rounded-full" src={product.images ? product.images[0].url : 'error'} alt="" />
                                                <div className="pl-3">
                                                    <div className="text-base font-semibold  overflow-x-hidden">{product.name}</div>
                                                    <div className="font-normal text-gray-500">{product.price}$</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 w-[20%]">{product.price}</td>
                                            <td className="py-4 px-6">{product.stock}</td>
                                            <td className="py-4 px-6">{product.createdAt}</td>
                                            <td className="py-4 px-6 flex items-center">
                                                <Link to="" className="font-medium text-blue-600 text-3xl hover:underline mr-3"><RiMoreFill /></Link>
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

export default Orders
