import React from 'react'
import { BsStarFill, BsStarHalf } from "react-icons/bs";

const Rating = (props) => {
    return (
        <div className="flex items-center">
            <div className='flex gap-1 w-28 text-yellow-500'>
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarHalf />
            </div>
            <p className="ml-2 text-sm font-medium text-gray-500">{props.rating} out of 5</p>
        </div>

    )
}

export default Rating
