import React from 'react'
import { Helmet } from 'react-helmet-async';
import { Sidebar, DashHeeder } from '../../Exports';

const Calender = () => {
  return (
    <>
      <Helmet>
        <title>Calender - Dashboard</title>
      </Helmet>
      <DashHeeder />
      <div className='flex'>
        <Sidebar />
        <div className='container lg:ml-80 mt-24'>

        </div>
      </div>
    </>
  )
}

export default Calender
