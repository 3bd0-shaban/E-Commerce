import React from 'react'
import { BsSearch} from 'react-icons/bs';
import Table from './Table';
export default function page() {
    return (
        <div className='container px-2 max-w-full'>
            <p className='text-lg font-semibold py-5'>Products</p>
            <div className='w-full space-y-2'>

                <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900">

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <BsSearch />
                        </div>
                        <input
                            type="text"
                            className="block outline-none p-2 pl-10 text-sm text-gray-900 border border-gray-300 
                         rounded-lg w-80 bg-gray-50 dark:bg-slate-900 dark:border-slate-500 dark:text-gray-300 dark:placeholder:text-gray-400
                          focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search for users" />
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:shadow-slate-700">
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-800 dark:text-slate-200">
                            <tr>
                                <th className="p-4">#</th>
                                <th className="px-6 py-3">basic info</th>
                                <th className="px-6 py-3">Phone Number</th>
                                <th className="px-6 py-3">Age</th>
                                <th className="px-6 py-3">Gender</th>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Fees</th>
                                <th className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <Table />
                    </table>
                </div>
                {/* <Pagination /> */}
            </div>
        </div>
    )
}
