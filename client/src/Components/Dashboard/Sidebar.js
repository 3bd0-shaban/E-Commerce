import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineMessage } from 'react-icons/ai';
import { IoPeopleOutline, IoPersonOutline, IoSettingsOutline, IoExitOutline } from 'react-icons/io5';
import { IoIosNotificationsOutline, IoMdPhotos } from 'react-icons/io';
import { BiTask } from 'react-icons/bi';
import { FcStackOfPhotos } from 'react-icons/fc'

const Sidebar = () => {
    const { pathname } = useLocation();
    const Lilinks = (props) => {
        return (
            <li className={(pathname === `${props.selected}`) ? 'bg-violet-500 !text-white rounded-xl py-3' : 'py-3 hover:bg-violet-500 hover:rounded-xl hover:text-white text-gray-600'}>
                <Link to={props.Link} className="SideBarLinks">
                    <span className="SVGElement">{props.icon}
                    </span>
                    <span className="SideBarElement">{props.title}</span>
                </Link>
            </li>
        )
    }
    return (
        <div className="w-80 hidden md:block bg-gray-50 border-r ">
            <div className="flex items-center h-28 border-b ">
                <span className="text-4xl justify-start mx-6"><FcStackOfPhotos /></span>
                <span className="font-bold text-3xl font-serif ">E-commerce</span>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow flex-col">
                <ul className="flex flex-col py-4 space-y-1 px-3 content-end">
                    <li className="px-3">
                        <div className="flex flex-row items-center h-8">
                            <div className="maintitle">Menu</div>
                        </div>
                    </li>
                    <Lilinks Link={"/dashboard/all_users"} selected={'/dashboard/all_users'} title='Users' icon={<AiOutlineDashboard />} />
                    <Lilinks Link={"/dashboard/all_products"} selected={'/dashboard/all_products'} title='Products' icon={<AiOutlineMessage />} />
                    <Lilinks Link={"/dashboard/charts"} selected={'/dashboard/charts'} title='Charts' icon={<IoMdPhotos />} />
                    <Lilinks Link={"/dashboard/calender"} selected={'/dashboard/calender'} title='Calender' icon={<IoIosNotificationsOutline />} />
                    <li className="px-3">
                        <div className="flex flex-row items-center h-8">
                            <div className="maintitle">Tasks</div>
                        </div>
                    </li>
                    <Lilinks Link={"/dashboard"} selected={'/availabetasks'} title='Friends' icon={<BiTask />} />
                    <Lilinks Link={"/dashboard"} selected={'/clients'} title='Parties' icon={<IoPeopleOutline />} />

                    <li className="px-3">
                        <div className="flex flex-row items-center h-8">
                            <div className="maintitle">Settings</div>
                        </div>
                    </li>
                    <Lilinks Link={"/dashboard"} selected={'/profile'} title='Profile' icon={<IoPersonOutline />} />
                    <Lilinks Link={"/dashboard"} selected={'/settings'} title='Settings' icon={<IoSettingsOutline />} />
                    <li>
                        <label className="inline-flex relative items-center mb-4 cursor-pointer ml-5">
                            <input type="checkbox" value="" id="default-toggle" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-600 ">Dark Mode</span>
                        </label>
                        <Link to="/" className="SideBarLinks">
                            <span className="SVGElement"><IoExitOutline /></span>
                            <span className="SideBarElement ">Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
