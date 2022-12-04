import React, { useState } from 'react'
import { DashHeeder, Sidebar, AddCategory, AddBrand, Addbanner } from '../../Exports'
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
const AddFeatures = () => {
    const [category, setCategory] = useState(true)
    const [brand, setBrand] = useState(false)
    const [banner, setBanner] = useState(false)
    return (
        <>
            <Helmet>
                <title>Add Features - Dashboard</title>
            </Helmet>
            <DashHeeder />
            <div className='flex'>
                <Sidebar />
                <div className='container px-1 lg:ml-[21.8rem] max-w-[105rem] mt-24'>
                    <p className='text-5xl font-Rubik '>Features</p>
                    <div className='flex gap-6 font-light text-xl mt-5'>
                        <Link onClick={() => { setCategory(true); setBrand(false); setBanner(false) }} className='border-b-transparent hover:border-b-black'>Categores</Link>
                        <Link onClick={() => { setCategory(false); setBrand(true); setBanner(false) }} className='border-b-transparent hover:border-b-black'>Brands</Link>
                        <Link onClick={() => { setCategory(false); setBrand(false); setBanner(true) }} className='border-b-transparent hover:border-b-black'>Banners</Link>
                        {/* <Link onClick={()=> set} className='border-b-transparent hover:border-b-black'>All</Link> */}
                    </div>
                    <hr className='mt-3 h-[2px] bg-gray-400 rounded' />
                    {category && <AddCategory />}
                    {brand && <AddBrand />}
                    {banner && <Addbanner />}
                </div>
            </div>
        </>
    )
}

export default AddFeatures
