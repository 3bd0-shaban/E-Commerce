import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const SideProfile = () => {
  const { pathname } = useLocation();
  const Lilinks = (props) => {
    return (
      <li className={(pathname === `${props.selected}`) ? 'bg-[#D7EDFF] rounded-lg text-[#4060ee]' : 'hover:bg-[#D7EDFF] hover:rounded-lg hover:text-[#4060ee] text-gray-600'}>
        <Link draggable={false} to={props.Link} className="relative flex flex-row items-center h-11 focus:outline-none border-l-4 border-transparent pr-6">
          <span className="inline-flex justify-center items-center text-2xl ml-4">{props.icon}
          </span>
          <span className="ml-4 text-base tracking-wide truncate font-medium">{props.title}</span>
        </Link>
      </li>
    )
  }
  return (
    <>
      <div className="w-80 hidden select-none lg:block bg-[#F6F8F9] border-r ">
        <div className="overflow-y-auto overflow-x-hidden flex-grow flex-col">
          <ul className="flex flex-col py-4 space-y-1 px-3 content-end">
            <Lilinks Link={"/dashboard/all_users"} selected={'/dashboard/all_users'} title='Users' />
            <Lilinks Link={"/dashboard/messages"} selected={'/dashboard/messages'} title='Messegaes' />
            <Lilinks Link={"/dashboard/all_products"} selected={'/dashboard/all_products'} title='Products' />
            <Lilinks Link={"/dashboard/addbanner"} selected={'/dashboard/addbanner'} title='Add Banners' />
            <Lilinks Link={"/dashboard/addproduct"} selected={'/dashboard/addproduct'} title='Add Product' />
            <Lilinks Link={"/dashboard/orders"} selected={'/dashboard/orders'} title='Orders' />
            <Lilinks Link={"/dashboard/stats"} selected={'/dashboard/stats'} title='Stats' />
            <Lilinks Link={"/dashboard/calender"} selected={'/dashboard/calender'} title='Calender' />
            <Lilinks Link={"/dashboard/issues"} selected={'/dashboard/issues'} title='Isseues' />
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideProfile
