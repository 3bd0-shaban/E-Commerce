import React from 'react'
import { HiOutlineCurrencyPound, HiOutlineShoppingBag } from 'react-icons/hi';
import { IoIosPeople } from 'react-icons/io'
import { Pending, useTitle, ColumnPlot } from '../../Exports'
import { BsPeople } from 'react-icons/bs';
const Dashboard = () => {
    useTitle('Dashboard');
    const State = ({ Title, Icon, Value, Percent, bgcolor, textcolor }) => {
        return (
            <div className='bg-white rounded-lg p-5 border flex justify-between border-gray-200 hover:shadow-xl duration-300 shadow-gray-500 h-full'>
                <div className='space-y-5'>
                    <p className='font-medium text-gray-400'>{Title}</p>
                    <p className='font-semibold text-gray-700 text-2xl'>{Value}</p>
                    <div className='text-xs text-gray-600 flex gap-3 items-center'>
                        <p className='text-green-500 font-semibold'>{Percent}</p>
                        <p>Than Last Week</p>
                    </div>
                </div>
                <div>
                    <p className='h-14 w-14 flex justify-center items-center rounded-xl font-semibold'
                        style={{ color: `${textcolor}`, backgroundColor: `${bgcolor}` }}
                    >{Icon}</p>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className='container max-w-full'>
                <div className='grid grid-cols-1 lg:grid-cols-5'>
                    <div className='col-span-4 grid grid-cols-2 md:grid-cols-3 gap-5'>
                        <div className='grid gap-5 grid-cols-1 h-full'>
                            <State Icon={<HiOutlineCurrencyPound size={25} />} bgcolor='#bbf7d0' textcolor='#22c55e' Title='TOTAL EARNINGS' Value='$745.35' Percent='18.30 %' />
                            <State Icon={<HiOutlineShoppingBag size={25} />} bgcolor='#bae6fd' textcolor='#0ea5e9' Title={'ORDERS'} Value='698.36k' Percent=' -2.74 %' />
                            <State Icon={<BsPeople size={25} />} bgcolor='#fde68a' textcolor='#f59e0b' Title={'CUSTOMERS'} Value='183.35M' Percent='+29.08 %' />
                        </div>
                        <div className='col-span-2 border rounded-lg p-5'>
                            <ColumnPlot />
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3'>
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5 col-span-2">
                        <Pending />
                    </div>
                    {/* <div className='text-7xl h-[25rem]'><PieChart /></div> */}
                </div>
                {/* <div className='h-[25rem] lg:h-[35rem] lg:w-[70%]'><LineChart /></div> */}
            </div>
        </>
    )
}

export default Dashboard
