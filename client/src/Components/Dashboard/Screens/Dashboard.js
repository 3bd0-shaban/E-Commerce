import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    DashHeeder, Sidebar, AddProduct, Charts, Calender, Orders,
    OrderAdminDetails, Chat, Issues, AllUsers, AllProducts, AddFeatures, useTitle, Overflow
} from '../../Exports'
const Dashboard = () => {
    useTitle('Dashboard');
    const { dash } = useParams();

    const [sideWidth, setIsSideWidth] = useState('300px');
    const [sideMargin, setIsSideMargin] = useState('300px');
    return (
        <>
            <DashHeeder setIsSideMargin={setIsSideMargin} setIsSideWidth={setIsSideWidth} sideMargin={sideMargin} />
            <div className='pb-24'>
                <Sidebar sideWidth={sideWidth} />
            </div>
            <div className='gap-1 duration-300 container max-w-full' style={{ paddingLeft: `${sideMargin}` }}>
                <div className='p-5'>
                    {(dash === 'overflow') && <Overflow />}
                    {(dash === 'all-users') && <AllUsers />}
                    {(dash === 'add-product') && <AddProduct />}
                    {(dash === 'add-feature') && <AddFeatures />}
                    {(dash === 'all-products') && <AllProducts />}
                    {(dash === 'charts') && <Charts />}
                    {(dash === 'calender') && <Calender />}
                    {(dash === 'orders') && <Orders />}
                    {(dash === 'order-details') && <OrderAdminDetails />}
                    {(dash === 'chat') && <Chat />}
                    {(dash === 'issess') && <Issues />}
                </div>
            </div>
        </>
    )
}

export default Dashboard
