import React from 'react'
import { Sidebar, UsersTable, Header, DashboardNavBar } from '../Exports'

const Dashboard = () => {
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
