import React, { useState } from 'react'
import { Sidebar, DashHeeder, Pending, Shipped, Delevered, AllOrders, Cancelled } from '../../Exports';
import { Link } from 'react-router-dom';
const Orders = () => {
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
                <div className='container lg:ml-80 mt-24'>
                    <p className='text-5xl font-Rubik '>Orders</p>
                    <div className='flex gap-6 font-light text-xl mt-5'>
                        <Link onClick={OpenPending} className='border-b-transparent hover:border-b-black'>Beneding</Link>
                        <Link onClick={OpenShipped} className='border-b-transparent hover:border-b-black'>Shipping</Link>
                        <Link onClick={OpenDelvered} className='border-b-transparent hover:border-b-black'>Delvered</Link>
                        <Link onClick={OpenCancelled} className='border-b-transparent hover:border-b-black'>Rejected</Link>
                        <Link onClick={OpenAllOrders} className='border-b-transparent hover:border-b-black'>All</Link>
                    </div>
                    <hr className='mt-3 h-[2px] bg-gray-400 rounded' />
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">

                        {pending && <Pending />}
                        {shipped && <Shipped />}
                        {delevered && <Delevered />}
                        {cancelled && <Cancelled />}
                        {allOrders && <AllOrders />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orders
