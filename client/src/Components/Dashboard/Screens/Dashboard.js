import React from 'react'
import { Helmet } from 'react-helmet-async'
import { IoIosPeople } from 'react-icons/io'
import { DashHeeder, Sidebar, Pending, PieChart, LineChart } from '../../Exports'
const Dashboard = () => {
    const State = (props) => {
        return (
            <div className='bg-white rounded-lg py-5 border-[.1px] space-y-4 xl:space-y-10'>
                <p className='text-lg text-gray-500 font-bold px-3'>{props.Title}</p>
                <div className='flex justify-between px-6'>
                    <div className='text-4xl text-green-600'>{props.Icon}</div>
                    <p className='text-green-500 bg-green-200 px-4 py-1.5 rounded-xl font-semibold'>+10%</p>
                </div>
            </div>
        )
    }
    return (
        <>
            <Helmet>
                <title>Add Features - Dashboard</title>
            </Helmet>
            <DashHeeder />
            <div className='flex bg-[#F9FBFC] min-h-screen'>
                <Sidebar />
                <div className='container lg:px-1 lg:pr-8 lg:ml-[21.8rem] max-w-full mt-24 '>
                    <div className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-2 xl:gap-7'>
                        <State Icon={<IoIosPeople />} Title={'Total visits'} />
                        <State Icon={<IoIosPeople />} Title={'Total visits'} />
                        <State Icon={<IoIosPeople />} Title={'Total visits'} />
                        <State Icon={<IoIosPeople />} Title={'Total visits'} />
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-3'>
                        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5 col-span-2">
                            <Pending />
                        </div>
                        <div className='text-7xl h-[25rem]'><PieChart /></div>
                    </div>
                    <div className='h-[25rem] lg:h-[35rem] lg:w-[70%]'><LineChart /></div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
