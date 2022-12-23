import moment from 'moment';
import React from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserByIdQuery } from '../../../../Redux/APIs/AuthApi';
import { FeaturesAction } from '../../../../Redux/Slices/FeaturesSlice';
const UserInfo = (props) => {
    const { isAdmin } = useSelector((state) => state.auth);
    const { sideUserInfo } = useSelector(state => state.Features)
    const dispatch = useDispatch();
    const { data: UserDetails } = useGetUserByIdQuery(props.id) || {};

    return (
        sideUserInfo &&
        <>
            <div onClick={() => dispatch(FeaturesAction.Show_sideUserInfo(false))} className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity z-20"></div>
            <div className='h-screen w-full sm:w-[70%] md:w-[60%] lg:w-[60%] xl:w-[50%] xxl:w-[35%] z-30 bg-white shadow-xl fixed right-0 top-0 overflowy-y-auto'>
                <div className='h-[15%] px-16'>
                    <div className='mt-10'>
                        <p className='text-3xl font-bold'>{UserDetails?.firstname}<span> {UserDetails?.lastname}</span></p>
                        <p className='text-gray-700 py-3'>{moment(UserDetails?.createdAt).format('MMMM Do YYYY h:mm')}</p>
                        <div className='flex gap-3'>
                            {isAdmin ? <p className='bg-blue-100 text-blue-500 truncate font-bold flex items-center px-10 py-3 rounded-md'>Admin</p>
                                : <p className='bg-blue-100 text-blue-500 truncate font-bold flex items-center px-10 py-3 rounded-md'>Customer</p>}
                            <p className='bg-blue-100 text-blue-500 truncate font-bold flex gap-3 items-center px-10 py-3 rounded-md'><HiOutlineMail style={{ fontSize: '1.7rem' }} />Email</p>
                        </div>
                    </div>
                </div>
                <div className='h-[85%] bg-[#F8F8F8] px-16'>
                    <div className='py-7'>
                        <p className='text-2xl font-medium'>Address</p>

                        <hr className='h-2 ' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserInfo
