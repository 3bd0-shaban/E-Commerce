import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Danger } from '../../../Utils/Alerts';
import {ShowRating, ProductsInfo, useTitle, Pagination } from '../../Exports';
import { useGetProductsQuery } from '../../../Redux/APIs/ProductsApi';
import moment from 'moment';
import { FeaturesAction } from './../../../Redux/Slices/FeaturesSlice';
import { MdOutlineSearch } from 'react-icons/md';
const AllProducts = () => {
    useTitle('All Products - Dashboard');
    const dispatch = useDispatch();
    const [id, setId] = useState('');
    const [params] = useSearchParams();
    const pagenum = params.get('page');
    const { data: products, isLoading: loading, error } = useGetProductsQuery(pagenum);

    return (
        <>
            {<ProductsInfo id={id} />}
            <div className='container max-w-full'>
                {loading ? <p className='mx-auto text-5xl font-Alegreya flex items-center'>Loading</p>
                    : error &&
                    <Danger error={error} className={'container max-w-7xl mx-auto my-5 w-[50vw]'} />
                }
                <p className='text-5xl font-Rubik '>All Products</p>
                <div className='flex gap-6 font-light text-xl mt-5'>
                    <Link draggable={false} to='?page=1' className='border-b-transparent hover:border-b-black'>Delevred</Link>
                    <Link draggable={false} to='?page=1' className='border-b-transparent hover:border-b-black'>Beneding</Link>
                    <Link draggable={false} to='?page=1' className='border-b-transparent hover:border-b-black'>Rejected</Link>
                    <Link draggable={false} to='?page=1' className='border-b-transparent hover:border-b-black'>All</Link>
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
                                <th scope="col" className="py-3 px-6 w-[30%]">Product Name</th>
                                <th scope="col" className="py-3 px-6">Rating</th>
                                <th scope="col" className="py-3 px-6">Number Of Reviews</th>
                                <th scope="col" className="py-3 px-6">Amount</th>
                                <th scope="col" className="py-3 px-6">Category</th>
                                <th scope="col" className="py-3 px-6">Sub Category</th>
                                <th scope="col" className="py-3 px-6">Brand</th>
                                <th scope="col" className="py-3 px-6">Date</th>
                            </tr>
                        </thead>
                        <tbody onClick={() => dispatch(FeaturesAction.Show_sideProductInfo())}>
                            {products &&
                                products?.map(product =>
                                    <tr className="bg-white border-b hover:bg-gray-50 cursor-pointer" onClick={() => setId(product?._id)} key={product?._id}>
                                        <td className="flex items-center py-4 ml-4">
                                            <img draggable={false} className="w-14 h-14 rounded-full" src={product?.images ? product?.images[0].url : 'error'} alt="" />
                                            <div className="pl-3">
                                                <div className="text-sm xl:text-base font-semibold  overflow-x-hidden mr-8 w-44 xxl:w-[95%] ellipse-2">{product?.name}</div>
                                                <div className="font-bold text-emerald-600 ">{product?.price}$</div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6"><ShowRating Rating={product?.rating} className={'text-[1.3rem] xl:text-[2rem] gap-1'} /></td>
                                        <td className="py-4 px-6">{product?.numofreviews}</td>
                                        <td className="py-4 px-6">{product?.stock}</td>
                                        <td className="py-4 px-6">{product?.category?.category}</td>
                                        <td className="py-4 px-6">{product?.subcategory?.nameOfSub}</td>
                                        <td className="py-4 px-6">{product?.brand?.brand}</td>
                                        <td className="py-4 px-6">{moment(product?.createdAt).calendar()}</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                    <div className='flex justify-center items-center my-10'>
                        <Pagination />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllProducts
