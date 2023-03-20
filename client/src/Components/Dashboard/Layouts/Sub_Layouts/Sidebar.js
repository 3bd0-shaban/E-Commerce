import React from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineBarChart } from 'react-icons/ai';
import { IoCalendarNumber, IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import { BiLogInCircle } from 'react-icons/bi';
import { BsBag, BsChat, BsGrid, BsPeople } from 'react-icons/bs';
import { GiShoppingCart } from 'react-icons/gi';
import { GoIssueReopened } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { FeaturesAction } from '../../../../Redux/Slices/FeaturesSlice';
import { Logo } from "../../../Exports";
import { useLogOutMutation } from "../../../../Redux/APIs/AuthApi";
import { LogOut } from "../../../../Redux/Slices/UserSlice";
import { motion } from 'framer-motion';

const SideBar = ({ sideWidth }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    console.log(pathname)
    const { SideBar } = useSelector(state => state.Features);
    const [logOut] = useLogOutMutation();
    const HandleLogOut = async () => {
        await logOut().unwrap()
            .then((payload) => {
                localStorage.setItem('Logged?', true);
                dispatch(LogOut(payload));
                navigate('/signin')
            })
            .catch((err) => {
                console.log(err)
            });
    }
    const Lilinks = ({ onClick, title, icon, Href }) => {
        return (
            <li className={(pathname === `${Href}`) ? 'bg-[#D7EDFF] rounded-lg text-[#4060ee]' :
                'hover:bg-[#D7EDFF] hover:rounded-lg hover:text-[#4060ee] text-gray-600'}>
                <div onClick={onClick}>
                    <Link draggable={false} to={Href} className="relative flex gap-2 flex-row items-center h-11 focus:outline-none border-l-4 border-transparent"
                        onClick={() => { dispatch(FeaturesAction.ShowSideBar(false)) }}>
                        <span className="inline-flex justify-center items-center text-xl ml-2">{icon}</span>
                        {(sideWidth === '300px') &&
                            <span className="text-base tracking-wide truncate">{title}</span>
                        }
                    </Link>
                </div>
            </li>
        )
    }
    return (
        <>
            {SideBar &&
                <>
                    <div onClick={() => dispatch(FeaturesAction.ShowSideBar(false))} className="fixed w-screen h-screen bg-black/20 block lg:hidden z-10"></div>
                    <motion.div className='lg:hidden flex h-screen fixed z-20 w-[18rem] sm:w-80 border-r shadow-2xl bg-[#F6F8F9]'
                        initial={{ x: -250 }}
                        animate={{ x: 0 }}
                        transition={{ duration: .1 }}
                    >
                        <div className="w-full">
                            <div className="flex items-center py-7 ml-8"><Logo /></div>
                            <div className="overflow-y-auto overflow-x-hidden flex-grow flex-col">
                                <ul className="flex flex-col py-4 space-y-1 px-3 content-end">
                                    <Lilinks Href={"/dashboard/overflow"} title='Dashboard' icon={<BsGrid />} />
                                    <Lilinks Href={"/dashboard/all-users"} title='Users' icon={<BsPeople />} />
                                    <Lilinks Href={"/dashboard/chat"} title='Messages' icon={<BsChat />} />
                                    <Lilinks Href={"/dashboard/all-products"} title='Products' icon={<BsBag />} />
                                    <Lilinks Href={"/dashboard/add-product"} title='Add Product' icon={<MdOutlineAddToPhotos />} />
                                    <Lilinks Href={"/dashboard/add-feature"} title='Add Features' icon={<MdOutlineAddToPhotos />} />
                                    <Lilinks Href={"/dashboard/orders"} title='Orders' icon={<GiShoppingCart />} />
                                    <Lilinks Href={"/dashboard/charts"} title='Stats' icon={<AiOutlineBarChart />} />
                                    <Lilinks Href={"/dashboard/calender"} title='Calender' icon={<IoCalendarNumber />} />
                                    <Lilinks Href={"/dashboard/issues"} title='Isseues' icon={<GoIssueReopened />} />
                                    <div className="bottom-0 absolute w-[90%]">
                                        <Lilinks Href={"/settings"} title='Settings' icon={<IoSettingsOutline />} />
                                        <Lilinks onClick={HandleLogOut} title='Log Out' icon={<BiLogInCircle />} />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </>
            }

            <div className="hidden lg:block bg-white duration-300 overflow-hidden h-full z-10 fixed border-r" style={{ width: `${sideWidth}` }}>
                {(sideWidth === '300px') ?
                    <div className="flex items-center py-7 ml-8"><Logo /></div> :
                    <Link draggable={false} to='/' className={`flex gap-10 py-7 px-4 items-center select-none text-4xl`}>
                        <div className='flex gap-2  relative'>
                            <p className='font-bold font-sans text-gray-800'>T</p>
                            <span className="w-3.5 h-3.5 bg-blue-700 rounded-full flex self-end"></span>
                        </div>
                    </Link>
                }

                <div className="overflow-y-auto overflow-x-hidden flex-grow flex-col">
                    <ul className="flex flex-col py-4 space-y-1 px-3 content-end">
                        <Lilinks Href={"/dashboard/overflow"} title='Dashboard' icon={<BsGrid />} />
                        <Lilinks Href={"/dashboard/all-users"} title='Users' icon={<BsPeople />} />
                        <Lilinks Href={"/dashboard/chat"} title='Messages' icon={<BsChat />} />
                        <Lilinks Href={"/dashboard/all-products"} title='Products' icon={<BsBag />} />
                        <Lilinks Href={"/dashboard/add-product"} title='Add Product' icon={<MdOutlineAddToPhotos />} />
                        <Lilinks Href={"/dashboard/add-feature"} title='Add Features' icon={<MdOutlineAddToPhotos />} />
                        <Lilinks Href={"/dashboard/orders"} title='Orders' icon={<GiShoppingCart />} />
                        <Lilinks Href={"/dashboard/charts"} title='Stats' icon={<AiOutlineBarChart />} />
                        <Lilinks Href={"/dashboard/calender"} title='Calender' icon={<IoCalendarNumber />} />
                        <Lilinks Href={"/dashboard/issues"} title='Isseues' icon={<GoIssueReopened />} />
                        <div className="bottom-0 absolute w-[90%]">
                            <Lilinks Href={"/settings"} title='Settings' icon={<IoSettingsOutline />} />
                            <Lilinks onClick={HandleLogOut} title='Log Out' icon={<BiLogInCircle />} />
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default SideBar;
