import axios from 'axios';
import React, { useEffect } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { AllUsersAction } from '../../Redux/Slices/AllUsers';
import getError from './../../utile';
import { Danger } from '../Alerts';
import { Sidebar, Header, DashboardNavBar } from '../../Exports';
import { ProductsAction } from '../../Redux/Slices/ProductSlice';

const AllProducts = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);
    useEffect(() => {
        const FetchData = async () => {
            dispatch(ProductsAction.Fetch_Data())
            try {
                const result = await axios.get('http://localhost:5000/api/upload/fetch_products');
                dispatch(ProductsAction.Success_Fetch(result.data));
            } catch (error) {
                dispatch(ProductsAction.Fail_Fetch(getError(error)));
            }
        };
        FetchData();
    }, [dispatch]);
    return (
        <>
            <Header />
            <div className='flex'>
                <Sidebar />
                <div className='container'>
                    <DashboardNavBar />
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
                    {loading ? <p className='text-7xl font-bold'> Loading ......</p>
                        : error ?
                            <Danger error={error} className={'mx-auto mt-20 text-7xl font-serif font-semibold bg-red-200 py-3 px-5'} />
                            :
                            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 mt-5">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                                        <tr>
                                            <th scope="col" className="p-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500  " />
                                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                                </div>
                                            </th>
                                            <th scope="col" className="py-3 px-6">Name</th>
                                            <th scope="col" className="py-3 px-6">des</th>
                                            <th scope="col" className="py-3 px-6">stock</th>
                                            <th scope="col" className="py-3 px-6">rating</th>
                                            <th scope="col" className="py-3 px-6">rating</th>
                                            <th scope="col" className="py-3 px-6">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product =>
                                            <tr className="bg-white border-b hover:bg-gray-50 " key={product._id}>
                                                <td className="p-4 w-4 ">
                                                    <div className="flex items-center">
                                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" />
                                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                                    </div>
                                                </td>
                                                <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap ">
                                                    <img className="w-10 h-10 rounded-full" src={product.image} alt="" />
                                                    <div className="pl-3">
                                                        <div className="text-base font-semibold">{product.name}</div>
                                                        <div className="font-normal text-gray-500">{product.price}$</div>
                                                    </div>
                                                </th>
                                                <td className="py-4 px-6">{product.des}</td>
                                                <td className="py-4 px-6">{product.stock}</td>
                                                <td className="py-4 px-6">{product.rating}</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center">
                                                        <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div> Online
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 w-[20rem]">
                                                    <Link to="/editproduct" className="font-medium text-blue-600 hover:underline mr-3">Edit product</Link>
                                                    <Link to={`/product/${product._id}`} className="font-medium text-blue-600 hover:underline mr-3">preview</Link>
                                                    <Link className='border px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 focus:bg-gray-200'>Remove</Link>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                    }
                </div>
            </div>

        </>
    )
}

export default AllProducts
