import React from 'react'
import { HiOutlineCurrencyPound, HiOutlineShoppingBag } from 'react-icons/hi';
import { IoIosPeople } from 'react-icons/io'
import { BsPeople } from 'react-icons/bs';
import ColumnPlot from '@Components/Graphs/ColumnPlot';
interface StateProps {
  Title?: string;
  Icon?: React.ReactNode;
  Value?: string;
  Percent?: string;
  bgcolor?: string;
  textcolor?: string;
}
export default function page() {
  const State: React.FC<StateProps> = ({ Title, Icon, Value, Percent, bgcolor, textcolor }) => {
    return (
      <div className='bg-white rounded-lg p-4 border flex justify-between border-gray-200 hover:shadow-xl duration-300 shadow-gray-500 h-full 
      dark:bg-slate-900 dark:border-slate-500 dark:text-slate-300'>
        <div className='space-y-3'>
          <p className='font-medium text-gray-400'>{Title}</p>
          <p className='font-semibold text-gray-700 text-2xl dark:text-slate-200'>{Value}</p>
          <div className='text-xs text-gray-600 flex gap-3 items-center'>
            <p className='text-green-500 font-semibold dark:text-slate-400'>{Percent}</p>
            <p className='dark:text-slate-500'>Than Last Week</p>
          </div>
        </div>
        <div>
          <p className='h-14 w-14 flex justify-center items-center rounded-xl font-semibold'
            style={{ color: `${textcolor}`, backgroundColor: `${bgcolor}` }}
          >{Icon}</p>
        </div>
      </div>
    )
  }
  return (
    <div className='container max-w-full'>
      <div className='grid grid-cols-1 lg:grid-cols-9 gap-5'>
        <div className='col-span-7 grid grid-cols-2 md:grid-cols-3 gap-5'>
          <div className='grid gap-5 grid-cols-1 h-full'>
            <State Icon={<HiOutlineCurrencyPound size={25} />} bgcolor='#bbf7d0' textcolor='#22c55e' Title='TOTAL EARNINGS' Value='$745.35' Percent='18.30 %' />
            <State Icon={<HiOutlineShoppingBag size={25} />} bgcolor='#bae6fd' textcolor='#0ea5e9' Title={'ORDERS'} Value='698.36k' Percent=' -2.74 %' />
            <State Icon={<BsPeople size={25} />} bgcolor='#fde68a' textcolor='#f59e0b' Title={'CUSTOMERS'} Value='183.35M' Percent='+29.08 %' />
          </div>
          <div className='col-span-2 border rounded-lg dark:border-slate-500'>
            <div className='flex justify-between items-center p-5'>
              <span>Revenue</span>
              <div className='flex gap-1'>
                <span className='bg-violet-200 text-violet-500 rounded-md h-8 w-8 flex justify-center items-center text-xs'>All</span>
                <span className='bg-violet-200 text-violet-500 rounded-md h-8 w-8 flex justify-center items-center text-xs'>1M</span>
                <span className='bg-violet-200 text-violet-500 rounded-md h-8 w-8 flex justify-center items-center text-xs'>6M</span>
                <span className='bg-violet-200 text-violet-500 rounded-md h-8 w-8 flex justify-center items-center text-xs'>1Y</span>
              </div>
            </div>
            <div className='bg-[#F9FBFC] h-16 w-full'>

            </div>
            <ColumnPlot />
          </div>
        </div>
        <div className='col-span-2 border w-full h-screen rounded-md lg:hidden'>

        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3'>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5 col-span-2">
          {/* <Pending /> */}
        </div>
        {/* <div className='text-7xl h-[25rem]'><PieChart /></div> */}
      </div>
      {/* <div className='h-[25rem] lg:h-[35rem] lg:w-[70%]'><LineChart /></div> */}
    </div>
  )
}
