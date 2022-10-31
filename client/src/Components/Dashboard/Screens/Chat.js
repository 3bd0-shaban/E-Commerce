import React from 'react'
import { Sidebar, DashHeeder } from '../../../Exports';

const Chat = () => {
    return (
        <>
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
