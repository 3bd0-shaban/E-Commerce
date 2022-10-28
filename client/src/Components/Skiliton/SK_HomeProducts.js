import React from 'react'
import { BsImages } from 'react-icons/bs'
const SK_HomeProducts = (props) => {
    return (
            <div className="space-y-8 animate-pulse w-2/12 p-2">
                <div className="flex justify-center items-center w-full h-48 bg-gray-300 rounded">
                    <BsImages style={{ fontSize: '50px', color: '#99999B' }} />
                </div>
                <div className="w-full">
                    <div className="h-5 bg-gray-200 rounded-full w-48 mb-4">{props.Id}</div>
                    <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
    )
}

export default SK_HomeProducts
