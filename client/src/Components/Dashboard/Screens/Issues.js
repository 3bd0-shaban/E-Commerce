import React from 'react'
import { Helmet } from 'react-helmet-async';
import { Sidebar, DashHeeder } from '../../Exports';

const Issues = () => {
  return (
    <>
      <Helmet>
        <title>Issues - Dashboard</title>
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

export default Issues
