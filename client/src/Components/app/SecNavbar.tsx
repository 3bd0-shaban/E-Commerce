'use client';
import { IoPersonOutline } from 'react-icons/io5'
import { BsList } from "react-icons/bs"
import { useState } from "react"
import { FeaturesAction } from "@Redux/Slices/FeaturesSlice"
import { useLogOutMutation } from "@Redux/APIs/AuthApi"
import useAuth from '@Hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@Hooks/useRedux';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Logo from '@Components/Layouts/Logo';
interface ArrayProps {
    title?: string;
    linkDir: string;
    icon?: React.ReactNode;
}

const SecNavbar = () => {
    const Array1: ArrayProps[] = [
        { title: 'Super Deals', linkDir: '/' },
        { title: 'New Arrival', linkDir: '/' },
        { title: 'Hot Products', linkDir: '/' },
        { title: 'Features Brand', linkDir: '/' },
        { title: 'Top Sells', linkDir: '/' },
        { title: 'Dashboard', linkDir: '/' },
    ]
    const Array2: ArrayProps[] = [
        { title: 'Track Your Order', linkDir: '/' },
        { title: '$ Dollar (US)', linkDir: '/' },
        { title: 'Register Or Sign in', linkDir: '/auth/signin', icon: <IoPersonOutline /> },
    ]

    const { roles } = useAuth();
    const dispatch = useAppDispatch();
    const { HomeSideBar } = useAppSelector(state => state.Features);
    const [open, setOpen] = useState(false);
    const [logOut] = useLogOutMutation();
    const Router = useRouter();
    const HandleLogOut = async () => {
        await logOut().unwrap()
            .then(() => {
                Router.push('/auth/signin')
            })
            .catch((err) => {

            });
    }
    const MoblieView = () => {
        return (
            <div className="w-screen block px-4 py-5 z-10 bg-gray-50 space-y-4 
            font-semibold text-gray-500 uppercase whitespace-nowrap text-lg drop">
                {Array1.map((item, index) => (
                    <Link
                        key={index}
                        href={item.linkDir}
                        draggable={false}
                        className="block" >
                        {item.title}
                    </Link>
                ))}

            </div>
        )
    }

    return (
        <>
            {/* {HomeSideBar && <SideBarMain />} */}
            <div className={`select-none ${open ? 'xl:hidden block bg-gray-50' : `xl:hidden block`}`}>
                <div className="flex items-center justify-between py-1 px-5 text-2xl ">
                    <div className="flex gap-2 items-center">
                        <button onClick={
                            () =>
                                dispatch(FeaturesAction.Show_HomeSideBar())
                        }
                            className="bg-gray-50 p-2 rounded-3xl hover:bg-gray-100
                             focus:bg-gray-200 focus:ring focus:ring-gray-200 text-3xl text-gray-500" >
                            <BsList />
                        </button>
                        <div className="text-3xl">
                            <Logo Font={'text-3xl'} />
                        </div>
                    </div>
                    <button
                        onClick={() => setOpen(!open)}
                        className="bg-gray-50 rounded-md border py-1.5 px-3 duration-300 
                        hover:bg-gray-100 focus:ring focus:ring-gray-200 text-2xl text-gray-500">
                        <BsList />
                    </button>
                </div>
                {open && < MoblieView />}
            </div>
            <div className='container max-w-[120rem] px-8 hidden xl:block'>
                <div className='flex justify-between items-center py-3'>
                    <div className="flex xl:gap-8 xxl:gap-14 font-semibold text-gray-500
                     uppercase whitespace-nowrap xl:text-base xxl:text-lg">

                        {Array1.map((item, index) => (
                            <Link
                                key={index}
                                href={item.linkDir}
                                draggable={false}
                                className="block" >
                                {item.title}
                            </Link>
                        ))}
                        {roles &&
                            <Link
                                href='/'
                                draggable={false}
                                onClick={HandleLogOut} >
                                {roles}
                            </Link>
                        }
                    </div>
                    <div className='text-gray-500 font-light text-center divide-x-2 flex gap-4'>
                        {Array2.map((item, index) => (
                            <Link
                                key={index}
                                href={item.linkDir}
                                draggable={false}
                                className="flex gap-1 items-center" >
                                {item.title}
                                {item.icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SecNavbar
