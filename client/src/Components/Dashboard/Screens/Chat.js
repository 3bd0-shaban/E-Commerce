import React from 'react'
import { Helmet } from 'react-helmet-async';
import { Sidebar, DashHeeder } from '../../Exports';

const Chat = () => {
    return (
        <>
            <Helmet>
                <title>Messsages - Dashbord</title>
            </Helmet>
            <DashHeeder />
            <div className='flex'>
                <Sidebar />
                <div className='container lg:ml-80 mt-24'>
                </div>
            </div>
        </>
    )
}

export default Chat
