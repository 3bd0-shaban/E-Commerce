import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Danger } from '../../Alerts';
import { Sidebar, DashHeeder, ShowRating } from '../../Exports';
import { RiMoreFill } from 'react-icons/ri'
import { Helmet } from 'react-helmet-async';
import { Get_AllProducts } from './../../../Redux/Actions/ProductsAction';
import moment from 'moment';
const AllProducts = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(Get_AllProducts());
    }, [dispatch]);
    return (
        <>
            <Helmet>
                <title>All Products - Dashboard</title>
            </Helmet>
            <DashHeeder />
            <div className='flex'>
                <Sidebar />
                <div className='container lg:ml-80 mt-24'>
                    <p className='text-5xl font-Rubik '>All Products</p>
                    <div className='flex gap-6 font-light text-xl mt-5'>
                        <Link className='border-b-transparent hover:border-b-black'>Delevred</Link>
                        <Link className='border-b-transparent hover:border-b-black'>Beneding</Link>
                        <Link className='border-b-transparent hover:border-b-black'>Rejected</Link>
                        <Link className='border-b-transparent hover:border-b-black'>All</Link>
                    </div>
                    <hr className='mt-3 h-[2px] bg-gray-400 rounded' />
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
                        <table className="w-full text-sm text-left text-gray-500 mt-5">
                            <thead className="text-xs text-gray-700 uppercase border-b-2 py-3">
                                <tr>
                                    <th scope="col" className="py-3 px-6 w-[30%]">Product Name</th>
                                    <th scope="col" className="py-3 px-6">Rating</th>
                                    <th scope="col" className="py-3 px-6">Amount</th>
                                    <th scope="col" className="py-3 px-6">Number Of Reviews</th>
                                    <th scope="col" className="py-3 px-6">Category</th>
                                    <th scope="col" className="py-3 px-6">Brand</th>
                                    <th scope="col" className="py-3 px-6">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? <p className='mx-auto text-5xl font-Alegreya flex items-center'>Loading</p> : error ? <Danger /> :
                                    products.map(product =>
                                        <tr className="bg-white border-b hover:bg-gray-50" key={product._id}>
                                            <td className="flex items-center py-4 ml-4">
                                                <img className="w-14 h-14 rounded-full" src={product.images ? product.images[0].url : 'error'} alt="" />
                                                <div className="pl-3">
                                                    <div className="text-base font-semibold  overflow-x-hidden">{product.name}</div>
                                                    <div className="font-normal text-gray-500">{product.price}$</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6"><ShowRating Rating={product.rating} /></td>
                                            <td className="py-4 px-6">{product.stock}</td>
                                            <td className="py-4 px-6">{product.numofreviews}</td>
                                            <td className="py-4 px-6">{product.numofreviews}</td>
                                            <td className="py-4 px-6">{product.brand}</td>
                                            <td className="py-4 px-6">{moment(product.createdAt).format("Do MMMM YYYY")}</td>
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

export default AllProducts
