import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineBarChart } from 'react-icons/ai';
import { IoCalendarNumber, IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import { ImUsers } from 'react-icons/im';
import { BiLogInCircle } from 'react-icons/bi';
import { BsChatRightTextFill } from 'react-icons/bs';
import { GiShoppingBag,GiShoppingCart,GiVerticalBanner } from 'react-icons/gi';
import { MdOutlineLocalFireDepartment } from 'react-icons/md'
import { GoIssueReopened } from 'react-icons/go'
import { CgChevronDown } from 'react-icons/cg'
const Sidebar = () => {
    const { pathname } = useLocation();
    const Lilinks = (props) => {
        return (
            <li className={(pathname === `${props.selected}`) ? 'bg-[#D7EDFF] rounded-lg text-[#4060ee]' : 'hover:bg-[#D7EDFF] hover:rounded-lg hover:text-[#4060ee] text-gray-600'}>
                <Link to={props.Link} className="relative flex flex-row items-center h-11 focus:outline-none border-l-4 border-transparent pr-6">
                    <span className="inline-flex justify-center items-center text-2xl ml-4">{props.icon}
                    </span>
                    <span className="ml-4 text-base tracking-wide truncate font-medium">{props.title}</span>
                </Link>
            </li>
        )
    }
    return (
        <>
            <div className="w-80 hidden lg:block bg-[#F6F8F9] h-full z-10 fixed border-r ">
                <Link to='/' className="flex items-center px-6 pt-7 pb-4">
                    <span className="text-4xl justify-start mx-1 text-[#fc9755]"><MdOutlineLocalFireDepartment /></span>
                    <span className="font-bold text-3xl font-Alegreya ">Web App</span>
                    <div className='font-mono font-extrabold flex items-center ml-1 my-auto text-xl'>
                        <CgChevronDown />
                    </div>
                </Link>
                <div className="overflow-y-auto overflow-x-hidden flex-grow flex-col">
                    <ul className="flex flex-col py-4 space-y-1 px-3 content-end">
                        <Lilinks Link={"/dashboard/all_users"} selected={'/dashboard/all_users'} title='Users' icon={<ImUsers />} />
                        <Lilinks Link={"/dashboard/messages"} selected={'/dashboard/messages'} title='Messegaes' icon={<BsChatRightTextFill />} />
                        <Lilinks Link={"/dashboard/all_products"} selected={'/dashboard/all_products'} title='Products' icon={<GiShoppingBag />} />
                        <Lilinks Link={"/dashboard/addbanner"} selected={'/dashboard/addbanner'} title='Add Banners' icon={<GiVerticalBanner />} />
                        <Lilinks Link={"/dashboard/addproduct"} selected={'/dashboard/addproduct'} title='Add Product' icon={<MdOutlineAddToPhotos />} />
                        <Lilinks Link={"/dashboard/orders"} selected={'/dashboard/orders'} title='Orders' icon={<GiShoppingCart />} />
                        <Lilinks Link={"/dashboard/stats"} selected={'/dashboard/stats'} title='Stats' icon={<AiOutlineBarChart />} />
                        <Lilinks Link={"/dashboard/calender"} selected={'/dashboard/calender'} title='Calender' icon={<IoCalendarNumber />} />
                        <Lilinks Link={"/dashboard/issues"} selected={'/dashboard/issues'} title='Isseues' icon={<GoIssueReopened />} />
                        <div className="bottom-0 absolute">
                            <Lilinks Link={"/dashboard"} selected={'/settings'} title='Settings' icon={<IoSettingsOutline />} />
                            <Lilinks Link={"/signin"} selected={''} title='Log Out' icon={<BiLogInCircle />} />
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
