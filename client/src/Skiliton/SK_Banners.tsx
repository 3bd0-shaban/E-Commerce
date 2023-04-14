import React from 'react'
import { BsImages } from 'react-icons/bs'
const SK_Banners = () => {
    return (
        <div className='container max-w-[100%]'>
            <div className="space-y-8 animate-pulse p-2">
                <div className="flex justify-center items-center w-full h-[9rem] sm:h-[10rem] 
                md:h-[15rem] lg:h-[21rem] xl:h-[27rem] xxl:h-[30rem] xxxl:h-[35rem] bg-gray-300 rounded">
                    <BsImages style={{ fontSize: '100px', color: '#99999B' }} />
                </div>
            </div>
        </div>
    )
}

export default SK_Banners
