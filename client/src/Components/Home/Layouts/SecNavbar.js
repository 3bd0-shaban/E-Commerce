import { Link } from "react-router-dom"
import { IoPersonOutline } from 'react-icons/io5'
import { BsList } from "react-icons/bs"
import { Logo, SideBarMain } from '../../Exports'
import { useState } from "react"
import { FeaturesAction } from "../../../Redux/Slices/FeaturesSlice"
import { useDispatch, useSelector } from 'react-redux';
const SecNavbar = () => {
    const dispatch = useDispatch();
    const { HomeSideBar } = useSelector(state => state.Features)
    const [open, setOpen] = useState(false);
    const MoblieView = () => {
        return (
            <div className="w-screen block px-4 py-5 z-10 bg-gray-50 space-y-4 font-semibold text-gray-500 uppercase text-lg drop">
                <Link className="block" >Super Deals</Link>
                <Link className="block" >New Arrival</Link>
                <Link className="block" >Hot Products</Link>
                <Link className="block" >Features Brand</Link>
                <Link className="block" >Top Sells</Link>
            </div>
        )
    }

    return (
        <>
            {HomeSideBar && <SideBarMain />}
            <div className={open ? 'xl:hidden block bg-gray-50' : `xl:hidden block`}>
                <div className="flex items-center justify-between py-1 px-5 text-2xl ">
                    <div className="flex gap-2 items-center">
                        <button onClick={() => dispatch(FeaturesAction.Show_HomeSideBar(true))} className="bg-gray-50 p-2 rounded-3xl hover:bg-gray-100 focus:bg-gray-200 focus:ring focus:ring-gray-200 text-3xl text-gray-500" ><BsList /></button>
                        <div className="text-3xl"><Logo Font={'text-3xl'} /></div>
                    </div>
                    <button onClick={() => setOpen(!open)} className="bg-gray-50 rounded-md border py-1.5 px-3 duration-300 hover:bg-gray-100 focus:ring focus:ring-gray-200 text-2xl text-gray-500">
                        <BsList />
                    </button>
                </div>
                {open && < MoblieView />}
            </div>
            <div className='container max-w-[140rem] px-8 hidden xl:block'>
                <div className='flex justify-between items-center py-3'>
                    <div className="flex gap-14 font-semibold text-gray-500 uppercase text-lg">
                        <Link >Super Deals</Link>
                        <Link >New Arrival</Link>
                        <Link >Hot Products</Link>
                        <Link >Features Brand</Link>
                        <Link >Top Sells</Link>
                    </div>
                    <div className='text-gray-500 font-light text-center divide-x-2 flex gap-4'>
                        <Link className="flex gap-1 items-center">Track Your Order</Link>
                        <Link className="flex gap-1 items-center">$ Dollar (US)</Link>
                        <Link to='/signin' className="flex gap-1 items-center"><IoPersonOutline />Register Or Sign in</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SecNavbar
