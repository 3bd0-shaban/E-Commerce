import React from 'react'
import Form from './Form';
export default function page() {
    return (
        <div className='container px-2 max-w-full'>
            <p className='text-lg font-semibold py-5'>Add Product</p>
            <div className='w-full space-y-2'>

                <div className="relative overflow-x-auto sm:rounded-lg dark:shadow-slate-700">
                    <Form />
                </div>
            </div>
        </div>
    )
}
