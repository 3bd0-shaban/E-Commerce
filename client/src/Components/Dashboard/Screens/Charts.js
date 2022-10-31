import React from 'react'
import { Helmet } from 'react-helmet-async';
import { Sidebar, DashHeeder, LineChart, PieChart } from '../../Exports';
const Charts = () => {
    return (
        <>
            <Helmet>
                <title>Anaylazes - Dashboard</title>
            </Helmet>
            <DashHeeder />
            <div className='flex'>
                <Sidebar />
                <div className='container lg:ml-80 mt-24 grid grid-cols-3 h-[40rem]'>
                    <div className='col-span-2'>
                        <LineChart />
                    </div>
                    <PieChart />
                    {/* <GeoChart /> */}
                </div>
            </div>
        </>
    )
}

export default Charts
