import React from 'react'
import { Header } from '../Exports';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { isLogged, user } = useSelector((state) => state.auth)
    return (
        <>
            <div className='body h-screen w-screen'>
                <Header />
                <div className='shadow-md container mzx-w-7xl h-96 mt-4 rounded-xl backdrop-blur-md bg'>
                    <div className='flex h-full'>
                        {
                            isLogged ?
                                <>

                                    <img src={user[0].avatar} alt='' className='h-full rounded-full' />
                                    <div className='ml-5'>
                                        <p className='text-2xl py-2'>{user[0].username}</p>
                                        <p className='text-2xl py-2'>{user[0].email}</p>
                                        <p className='text-2xl py-2'>{user[0]._id}</p>
                                        <p className='text-2xl py-2'>{user[0].createdAt}</p>
                                        <p className='text-2xl py-2'>{user[0].updatedAt}</p>
                                    </div>
                                </>
                                :
                                <p className='p-4 text-6xl mx-auto font-bold flex items-center text-gray-100'>No User Founded</p>
                        }
                    </div>
                </div>


            </div>
        </>
    )
}

export default Profile
