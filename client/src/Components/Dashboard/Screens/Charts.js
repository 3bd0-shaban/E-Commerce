import React from 'react'
import { Sidebar, DashHeeder, LineChart, PieChart, useTitle } from '../../Exports';
const Charts = () => {
    useTitle('Anaylazes - Dashboard');
    return (
        <>
            <DashHeeder />
            <div className='flex'>
                <Sidebar />
                <div className='container lg:ml-80 mt-24 grid grid-cols-3 h-[40rem]'>
                    <div className='col-span-2'>
                        {/* <LineChart /> */}
                    </div>
                    {/* <PieChart /> */}
                    {/* <GeoChart /> */}
                </div>
            </div>
        </>
    )
}

export default Charts
