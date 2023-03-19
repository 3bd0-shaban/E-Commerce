import React from 'react'
import { BsTrash } from 'react-icons/bs';

const PreviewImege = (props) => {
    return (
        <div className='mb-4'>
            <div className='border rounded-md  py-3 mt-5 w-full flex justify-between'>
                <div className='flex items-center'>
                    <img draggable={false} className='h-12 w-12 object-cover mx-3' src={props.img} alt='' />
                    <div>
                        <p>product name</p>
                        <p className='text-xs'>product name</p>
                    </div>
                </div>
                <button type='button' className='mr-2 text-3xl flex items-center' onClick={props.onClick} key={props.mykey}>
                    <BsTrash />
                </button>
            </div>
        </div>
    )
}

export default PreviewImege
