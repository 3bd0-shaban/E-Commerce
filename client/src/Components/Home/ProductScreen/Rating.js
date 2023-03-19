import React from 'react'
import { BsStarFill, BsStarHalf,BsStar } from "react-icons/bs";

const Rating = (props) => {
    return (
        <div className="flex items-center select-none">
            <p className="ml-2 text-sm font-medium text-gray-500">{props.rating}</p>
            <div className='flex gap-1 w-28 text-yellow-400'>
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarHalf />
                <BsStar/>
            </div>
        </div>

    )
}

export default Rating
