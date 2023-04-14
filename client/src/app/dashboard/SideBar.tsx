'use client';
import React from 'react'
import { BsChat, BsChatSquareText, BsChatText, BsGear, BsGrid, BsPeople, BsPersonLinesFill } from 'react-icons/bs'
import AnimSlideRight from '@Animation/AnimSlideRight';
import { AiOutlineAlipay } from 'react-icons/ai'
import { IoCalendarNumberOutline, IoNewspaperOutline } from 'react-icons/io5'
import useBreakpoint from '@Hooks/useBreakpoint';
import { AnimatePresence, motion } from 'framer-motion'
import { FeaturesAction } from '@Redux/Slices/FeaturesSlice';
import { GiAlarmClock } from 'react-icons/gi';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@Hooks/useRedux';

interface LinkListProps {
    Icon: React.ReactNode;
    Title: string;
    Href: string;
    // onClose?: () => void;
}
const linkListItems: LinkListProps[] = [
    {
        Icon: <BsGrid size={15} />,
        Title: 'Dashboard',
        Href: '/doctor/doctor-dashboard'
    },
    {
        Icon: <IoCalendarNumberOutline size={17} />,
        Title: 'Appointment',
        Href: '/doctor/doctor-appointment'
    },
    {
        Icon: <GiAlarmClock size={17} />,
        Title: 'Schedule Timing',
        Href: '/doctor/doctor-schedule'
    },
    {
        Icon: <IoNewspaperOutline size={17} />,
        Title: 'Invoices',
        Href: '/doctor/invoices'
    },
    {
        Icon: <BsChatText size={17} />,
        Title: 'Messages',
        Href: '/doctor/doctor-messages'
    },
    {
        Icon: <BsPeople size={17} />,
        Title: 'Patient List',
        Href: '/doctor/patient-list'
    },
    {
        Icon: <BsChatSquareText size={17} />,
        Title: 'Patients Review',
        Href: '/doctor/patient-review'
    },
    {
        Icon: <BsChat size={17} />,
        Title: 'Chat',
        Href: '/doctor/doctor-chat'
    },
    {
        Icon: <AiOutlineAlipay size={17} />,
        Title: 'Payment Information',
        Href: '/doctor/payment'
    },
    {
        Icon: <BsGear size={17} />,
        Title: 'Profile',
        Href: '/doctor/doctor-profile'
    },
    {
        Icon: <BsPersonLinesFill size={17} />,
        Title: 'Profile Settings',
        Href: '/doctor/settings'
    }
];

const SideBar: React.FC = () => {
    const { MobileView } = useBreakpoint();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const { DocSide } = useAppSelector(state => state.Features);

    const LinkList: React.FC = ({ }) => {
        return (
            <>
                {linkListItems.map((item, index) => (

                    <div
                        key={index}
                        onClick={() => { DocSide && dispatch(FeaturesAction.setDocSide()) }}
                        className={
                            `text-xs px-5 my-3 w-full ${(pathname === item.Href) ?
                                '!text-blue-600'
                                : ' text-gray-300'}`
                        }
                    >
                        <Link
                            href={item.Href}
                            aria-label='side bar link'
                            draggable={false}>
                            <div className={`flex gap-4 py-2 items-center hover:text-blue-600 group-hover:text-blue-600 
                            dark:hover:text-blue-600 dark:group-hover:text-blue-600 
                            ${(pathname === item.Href) ? ' text-blue-600' : 'text-gray-600 dark:text-slate-400'}`}>
                                {item.Icon}
                                <p className='text-sm'>{item.Title}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </>

        )
    }

    return (
        <>
            {!MobileView &&
                <div className='dark:shadow-slate-700 hidden md:block px-0 overflow-hidden rounded-lg mt-10'>
                    <LinkList />
                </div>
            }
            <AnimatePresence>
                {DocSide &&
                    <>
                        <div
                            onClick={() => dispatch(FeaturesAction.setDocSide())}
                            className='fixed inset-0 z-10 block lg:hidden bg-black/30'></div>
                        <motion.div
                            variants={AnimSlideRight}
                            initial='initial'
                            animate='animate'
                            exit='exit'
                            className='fixed top-0 left-0 w-80 z-20 bg-white h-screen overflow-hidden mt-10'>
                            <LinkList />
                        </motion.div>
                    </>
                }
            </AnimatePresence>
        </>
    )
}

export default SideBar
