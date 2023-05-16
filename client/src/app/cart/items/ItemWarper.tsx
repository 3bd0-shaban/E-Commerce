'use client';
import { useGetCartQuery } from "@Redux/APIs/CartApi";
import GetError from "@lib/GetError";
import React, { useEffect, useState } from "react";
import CartEmpty from "./CartEmpty";
import Link from "next/link";
import { ImSpinner7 } from "react-icons/im";
import { useLoadPaypalMutation, useNewOrderMutation } from "@Redux/APIs/OrderApi";
import { useAppSelector } from '@Hooks/useRedux';
import { selectCurrentUser } from '@Redux/Slices/UserSlice';
import { MessageErrorActivate } from "@lib/Alerts";
import CartItem from "./CartItem";
export default function ItemWraper() {

    const { data: cart, isFetching: loading, error } = useGetCartQuery() || {};
    const [newOrder, { isLoading, error: orderError }] = useNewOrderMutation();
    const [LoadPaypal] = useLoadPaypalMutation()
    const [success, setSuccess] = useState('')
    const [addessPage, setAddressPage] = useState(false);
    const [activateMSG, setActivateMSG] = useState(false);
    const user = useAppSelector(selectCurrentUser)
    const NewOrderHandler = async () => {
        if (!user?.isVerified) {
            setActivateMSG(true)
            return
        }
        // eslint-disable-next-line
        if (user?.address == 0) {
            setAddressPage(true)
        }
        // usePayPalScriptReducer();
        await newOrder().unwrap()
            .then((payload) => setSuccess(payload.message))
    }
    const [purchasePrice, setPurchasePrice] = useState(0);

    useEffect(() => {
        let totalPrice = 0;
        const itemLength = cart?.items.length || 0;
        for (let i = 0; i < itemLength; i++) {
            totalPrice += (cart?.items[i]?.quentity || 0) * (cart?.items[i]?.product_Id.price || 0);
        }
        setPurchasePrice(totalPrice);
    }, [cart]);
    return (
        <>
            <div className='conatiner px-0 max-w-full col-span-3'>
                {/* {orderError && <GetError error={error} danger />} */}
                {activateMSG && <MessageErrorActivate error={'Your email is not verified ,please verify it first before you continue to checkout'}
                    className={'container my-5 px-0'} />}
                {success && <GetError error={error} success />}
                <div className='conatiner px-0 max-w-full col-span-3 grid grid-cols-6'>
                    {addessPage ?
                        <>
                            <div className='col-span-1 space-y-3 hidden xl:block'>
                                <p className='text-2xl font-medium text-gray-600'>Add New Address</p>
                                <p className='mt-2 text-base font-semibold text-gray-500 leading-7'>Please provide us with with an address you usually in</p>
                                <p>
                                    <Link href='/' draggable={false} className='text-blue-400 hover:text-blue-500 underline font-bold mt-3'>Your Address</Link>
                                </p>
                            </div>
                            <div className='col-span-6 xl:col-span-5 container px-0'>
                                {/* <Address /> */}
                            </div>
                        </> :
                        <>
                            <div className='col-span-6 bg-white'>
                                <div className='container max-w-[100rem]'>
                                    <div className='py-5'>
                                        <div className='flex justify-center py-2'>
                                            <p className='text-5xl py-2 font-medium font-Oswald'>Shopping Cart</p>
                                        </div>
                                        <p className='px-2 text-2xl font-semibold'>Product Details :</p>
                                    </div>
                                    <div>
                                        {loading ? <p className='text-3xl font-bold flex justify-center items-center'>loading</p> :
                                            error ?
                                                <GetError error={error} danger /> :
                                                (cart?.items.length ?? 0 > 0) ?
                                                    cart?.items.map((item, index) => (
                                                        <div key={index}>
                                                            <CartItem item={item} />
                                                        </div>
                                                    ))
                                                    : <CartEmpty />
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className='flex px-10 container col-span-1 max-w-[80%]  rounded-lg bg-[#F9F9F9] max-h-full py-8'>
                <div className='w-full'>
                    <p className='text-3xl font-semibold py-3'>Order Summary</p> <hr className='my-2' />
                    <div className='space-y-5'>
                        <div className='flex justify-between py-2'>
                            <p>Subtotal :</p>
                            <p className='text-lg text-green-500 font-bold'>500 EGP</p>
                        </div>
                        <div className='flex justify-between py-2'>
                            <p>Shipping :</p>
                            <p className='text-lg text-green-500 font-bold'>50 EGP</p>
                        </div><hr className='my-4' />
                        <div className='flex justify-between py-2'>
                            <p className='text-xl text-red-700 font-bold'>Order Total</p>
                            <p className='text-lg text-green-500 font-bold'>{purchasePrice} EGP</p>
                        </div>
                    </div>
                    <div className='flex justify-center mt-4'>
                        {/* <PayPalButtons >
                            Paypal
                        </PayPalButtons> */}
                        <button onClick={NewOrderHandler} className='btn-success !mb-2 !block !w-3/4 !py-4 !rounded-3xl' disabled={isLoading}>
                            {isLoading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'>
                                <ImSpinner7 /> </span> : 'Checkout'}
                        </button>
                    </div>
                    <Link
                        draggable={false}
                        href='/'
                        className='text-lg flex justify-center my-2 font-thin font-serif text-gray-500 hover:underline hover:text-blue-700'>
                        Back to shoping
                    </Link>
                </div>
            </div>
        </>

    )
}