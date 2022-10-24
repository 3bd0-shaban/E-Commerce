import React from 'react'
import { Sidebar, Header,LineChart,PieChart } from '../../Exports';
const Charts = () => {
    return (
        <>
            <Header />
            <div className='flex'>
                <Sidebar />
                <div className='container grid grid-cols-2 h-[40rem]'>
                    <LineChart />
                    <PieChart/>
                    {/* <GeoChart /> */}
                </div>
            </div>
        </>
    )
}

export default Charts
