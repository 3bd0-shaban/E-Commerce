import React from 'react'
import { useDispatch } from 'react-redux';
import { FeaturesAction } from '../../../../Redux/Slices/FeaturesSlice';
const Confirm = (props) => {
    const dispatch = useDispatch();
    return (
        <>
            <div className="fixed inset-0 bg-black/40 z-20" onClick={() => dispatch(FeaturesAction.Show_Confirm(false))}></div>
            <div className='flex fixed z-30 inset-0 justify-center items-center'>
                <div className="relative max-w-xl ">
                    <div className="relative bg-white rounded-lg shadow-[0_0px_100px_10px_rgba(0,0,0,0.3)]">
                        <div className="text-center pt-4">
                            <div className='px-28 py-6'>
                                <p className='text-2xl font-medium py-2'>Delete Banner ?</p>
                                <h3 className="mb-5 text-lg font-light text-gray-800">Are you sure you Want to delete banner</h3>
                            </div><hr />
                            <div className='block text-lg text-red-600 font-medium py-3 cursor-pointer hover:bg-gray-100' onClick={props.OnConfirm}>Confirm</div><hr />
                            <div className='block text-lg text-gray-700 font-normal py-3 cursor-pointer hover:bg-gray-100 hover:rounded-lg' onClick={() => dispatch(FeaturesAction.Show_Confirm(false))}>Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Confirm