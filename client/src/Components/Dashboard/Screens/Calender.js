import React from 'react'
import { Sidebar, DashHeeder, useTitle } from '../../Exports';

const Calender = () => {
  useTitle('Calender - Dashboard');
  return (
    <>
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
