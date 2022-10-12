import React from 'react'
import { Sidebar, UsersTable, Header, DashboardNavBar } from '../Exports'
// import { useLocation } from 'react-router-dom'
const Dashboard = () => {
    // const { location } = useLocation();
    return (
        <>
            <Header />
            <div className='flex'>
                <Sidebar />
                <div className='container'>

                    <DashboardNavBar />
                    <UsersTable />

                </div>
            </div>
        </>
    )
}

export default Dashboard
