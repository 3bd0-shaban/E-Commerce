import React from 'react'
import { useProductsByCategoryQuery, useSearchQuery } from '../../../Redux/APIs/ProductsApi'
import { Header, Footer, ShowRating } from '../../Exports'
import { Link, useSearchParams, useParams } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import HomeProducts2 from './HomeProducts2';
const Search = () => {
    const [searchquery] = useSearchParams();
    const keyword = searchquery.get('keyword')
    const category = searchquery.get('category')
    // const { data: result } = useSearchQuery(keyword) || {};
    const { data: result } = useProductsByCategoryQuery(category) || {};
    return (
        <>
            <Header />
            <div className='Container max-w-[120rem] mt-5 select-none'>
                <div className='grid grid-cols-6'>
                    <div className='col-span-1'></div>
                    <div className='col-span-5'>
                        <div className='my-5'>
                            <HomeProducts2 />
                        </div><hr />
                        {result?.map(product => (
                            <div key={product?._id} className='grid grid-cols-5 gap-10'>
                                <div className='col-span-4'>
                                    <div className='grid grid-cols-5 gap-10'>
                                        <div className='col-span-1 flex justify-center mr-5'>
                                            <img draggable={false} src={product?.images[0].url} className=' min-w-full mx-auto' alt='' />
                                        </div>
                                        <div className='col-span-4'>
                                            <div className='xl:col-span-2 '>
                                                <div className='flex justify-between items-start'>
                                                    <p className='text-xl font-semibold py-3 '>{product?.name}</p>
                                                    <Link draggable={false} className='fill-black'><CiHeart style={{ fontSize: "2.5rem" }} /></Link>
                                                </div>
                                                <hr />
                                                <div className='flex items-center gap-3'>
                                                    <ShowRating Rating={product?.rating} className={'!text-xl gap-1 text-[#FDD901]'} />
                                                    <p>( {product?.numofreviews} )</p>
                                                </div>
                                                <div className='text-xl leading-10'>
                                                    {product?.specs?.map(item => (
                                                        <div className='grid grid-cols-4'>
                                                            <div className='col-span-1'><li className='block'>{item.title} :</li></div>
                                                            <div className='col-span-3'><li>{item.description}</li></div>
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-1'>
                                    {/* <p className='text-xl mt-auto'>{productDetails.des}</p> */}

                                    {product.stock > 0 ?
                                        <div className='py-5'>
                                            <p className='mb-4 text-lg font-light'>Avability : <span className='font-semibold text-green-600'>In Stock</span></p>
                                            <hr />
                                            {product.stock < 5 && product.stock > 0 && <p className='my-3'>Only {product.stock} is available</p>}
                                            <div className='flex gap-5'>
                                                <p className='text-3xl font-bold mt-auto text-blue-600 py-3'>$ {product.price}</p>
                                                <p className='text-2xl items-center flex text-gray-500 line-through'>$ {product.discountprice}</p>
                                            </div>
                                            <div className='flex items-center justify-center'>
                                                <Link draggable={false} className='px-28 mt-5 whitespace-nowrap text-center border-4 border-blue-500 py-3 rounded-full font-medium hover:bg-blue-500 focus:ring focus:ring-blue-600 hover:text-white'>Add to Card</Link>
                                            </div>
                                        </div>
                                        :
                                        <p>Out Of Stock</p>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Search
