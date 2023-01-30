import React, { useState } from 'react'
import { Sidebar, DashHeeder, Pending, Shipped, Delevered, AllOrders, Cancelled, useTitle } from '../../Exports';
import { Link } from 'react-router-dom';
import { MdOutlineSearch } from 'react-icons/md';
import { AnimatePresence } from 'framer-motion';
const Orders = () => {
    useTitle('All Orders -Dashboard');
    const [pending, setPending] = useState(true);
    const [shipped, setShipped] = useState(false);
    const [delevered, setDelvered] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const [allOrders, setAllOrders] = useState(false);
    const OpenPending = () => {
        setPending(true); setShipped(false);
        setDelvered(false); setCancelled(false); setAllOrders(false);
    }
    const OpenShipped = () => {
        setPending(false); setShipped(true);
        setDelvered(false); setCancelled(false); setAllOrders(false);
    }
    const OpenDelvered = () => {
        setPending(false); setShipped(false);
        setDelvered(true); setCancelled(false); setAllOrders(false);
    }
    const OpenCancelled = () => {
        setPending(false); setShipped(false);
        setDelvered(false); setCancelled(true); setAllOrders(false);
    }
    const OpenAllOrders = () => {
        setPending(false); setShipped(false);
        setDelvered(false); setCancelled(false); setAllOrders(true);
    }
    return (
        <>
            <DashHeeder />
            <div className='flex'>
                <Sidebar />
                <div className='container max-w-full lg:ml-80 mt-24'>
                    <p className='text-5xl font-Rubik '>Orders</p>
                    <div className='flex gap-6 font-light text-xl mt-5'>
                        <Link to='?page=1' onClick={OpenPending} className={`${pending && 'font-normal border-b-2 border-b-black'}`}>Beneding</Link>
                        <Link to='?page=1' onClick={OpenShipped} className={`${shipped && 'font-normal border-b-2 border-b-black'}`}>Shipping</Link>
                        <Link to='?page=1' onClick={OpenDelvered} className={`${delevered && 'font-normal border-b-2 border-b-black'}`}>Delvered</Link>
                        <Link to='?page=1' onClick={OpenCancelled} className={`${cancelled && 'font-normal border-b-2 border-b-black'}`} >Rejected</Link>
                        <Link to='?page=1' onClick={OpenAllOrders} className={`${allOrders && 'font-normal border-b-2 border-b-black'}`}>All</Link>
                    </div>
                    <hr className='mt-3 h-[2px] bg-gray-400 rounded' />
                    <div className='flex justify-end pr-2 md:pr-10 mt-5'>
                        <form >
                            <div className="relative">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none font-extralight text-2xl text-gray-400">
                                    <MdOutlineSearch />
                                </div>
                                <input type="search" className="Searchbar !border" placeholder="Search" required="" />
                            </div>
                        </form>
                    </div>

                    <AnimatePresence>
                        {
                            pending &&
                            <Pending />
                        }
                    </AnimatePresence>
                    <AnimatePresence>
                        {
                            shipped &&
                            <Shipped />
                        }
                    </AnimatePresence>
                    <AnimatePresence>
                        {
                            delevered &&
                            <Delevered />

                        }
                    </AnimatePresence>
                    <AnimatePresence>
                        {
                            cancelled &&
                            <Cancelled />
                        }
                    </AnimatePresence>
                    <AnimatePresence>
                        {
                            allOrders &&
                            <AllOrders />
                        }
                    </AnimatePresence>
                </div>
            </div>
        </>
    )
}

export default Orders
