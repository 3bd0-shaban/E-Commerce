import React from 'react'
import { useSelector } from 'react-redux';
const PersonalInfo = () => {
    const { isLogged, user } = useSelector((state) => state.auth);

    return (
        <div className=''>
            <div className='shadow-md h-96 mt-4 rounded-xl backdrop-blur-md bg'>
                <div className='flex h-full w-full'>
                    {
                        isLogged ?
                            <>
                                <img src={user.avatar} alt='' className='h-full rounded-full' />
                                <div className='ml-5'>
                                    <p className='text-2xl py-2'>{user.username}</p>
                                    <p className='text-2xl py-2'>{user.email}</p>
                                    <p className='text-2xl py-2'>{user._id}</p>
                                    <p className='text-2xl py-2'>{user.createdAt}</p>
                                    <p className='text-2xl py-2'>{user.updatedAt}</p>
                                </div>
                            </>
                            :
                            <p className='p-4 text-6xl mx-auto font-bold flex items-center text-gray-100'>No User Founded</p>
                    }
                </div>
            </div>


        </div>
    )
}

export default PersonalInfo
