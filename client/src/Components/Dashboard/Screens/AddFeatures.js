import React, { useState } from 'react'
import { AddCategory, AddBrand, Addbanner } from '../../Exports'
import { Link } from 'react-router-dom';
const AddFeatures = () => {
    const [category, setCategory] = useState(true)
    const [brand, setBrand] = useState(false)
    const [banner, setBanner] = useState(false)
    return (
        <>

            <div className='container px-1 max-w-full'>
                <p className='text-4xl xl:text-5xl font-Rubik '>Features</p>
                <div className='flex gap-6 font-light text-xl mt-5'>
                    <Link draggable={false} onClick={() => { setCategory(true); setBrand(false); setBanner(false) }} className='border-b-transparent hover:border-b-black'>Categores</Link>
                    <Link draggable={false} onClick={() => { setCategory(false); setBrand(true); setBanner(false) }} className='border-b-transparent hover:border-b-black'>Brands</Link>
                    <Link draggable={false} onClick={() => { setCategory(false); setBrand(false); setBanner(true) }} className='border-b-transparent hover:border-b-black'>Banners</Link>
                    {/* <Link draggable={false} onClick={()=> set} className='border-b-transparent hover:border-b-black'>All</Link> */}
                </div>
                <hr className='mt-3 h-[2px] bg-gray-400 rounded' />
                {category && <AddCategory />}
                {brand && <AddBrand />}
                {banner && <Addbanner />}
            </div>
        </>
    )
}

export default AddFeatures
