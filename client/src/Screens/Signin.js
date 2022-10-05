import React from 'react'
import { Header } from '../Exports'
const Signin = () => {
  return (
    <>
      <Header />
      <div className=' container max-w-xl'>
        <div className='flex items-center justify-center align-middle mt-16 '>
          <form className='border px-4 text-center rounded-xl py-32'>
            <p className='mx-auto text-4xl font-bold font-mono text-gray-600 py-5'>Sign In</p>
            <input className='outline-none bg-gray-50 rounded-xl py-3 px-3 w-full my-2 placeholder:text-sm placeholder:font-mono focus:border' type='email' placeholder='Enter Email' />
            <input className='outline-none bg-gray-50 rounded-xl py-3 px-3 w-full my-2 placeholder:text-sm placeholder:font-mono focus:border' type='password' placeholder='Enter Password' />
            <button className='bg-green-500 py-2 px-3 rounded-lg text-white font-semibold w-1/2 focus:ring focus:ring-green-400 mt-5'>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signin
