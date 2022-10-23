import React from 'react'
import Header from '../Home/Header'
import LineChart from './Chart/LineChart'
import GeoChart from './Chart/GeoChart'
import PieChart from './Chart/PieChart'
import Sidebar from './Sidebar';

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
