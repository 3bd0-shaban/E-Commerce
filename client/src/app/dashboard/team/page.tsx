import Image from 'next/image'
import React from 'react'
import Patient from './Patient'

export default function page() {
  return (
    <>
      <p className='text-lg font-semibold py-5'>Patients List</p>
      <div >
        <Patient />
      </div>
    </>
  )
}
