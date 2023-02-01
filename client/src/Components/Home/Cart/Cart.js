import React, { useState } from 'react';
import { Header, CartItem, Footer, HomeProducts2, Address } from '../../Exports';
import { FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDecrementMutation, useDeleteItemInCartMutation, useGetCartQuery, useIncrementMutation } from '../../../Redux/APIs/CartApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoadPaypalMutation, useNewOrderMutation } from '../../../Redux/APIs/OrderApi';
import { Danger, MessageErrorActivate, Success } from '../../Alerts';
import { ImSpinner7 } from 'react-icons/im';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useTitle } from '../../Exports'
import { useGetUserQuery } from '../../../Redux/APIs/AuthApi';
const CartEmpty = () => {
    return (
        <div className='text-center'>
            <p className='text-xl py-2'>Your cart is empty</p>
            <div className='text-[18rem] flex justify-center text-green-600'>
                <FaShoppingBag />
            </div>
            <p className='py-4'>Go to main page and shope for your products</p>
            <Link to='/' className='border border-green-300 rounded-2xl text-2xl text-white bg-green-600 py-2 px-3'>Browse Products</Link>
        </div>
    )
}
const Cart = () => {
    useTitle('Cart')
    const [id, setID] = useState('');
    const [addessPage, setAddressPage] = useState(false);
    const [activateMSG, setActivateMSG] = useState(false);
    const product_Id = id;
    const { data: cart, isFetching: loading, error } = useGetCartQuery() || {};
    const [Increment] = useIncrementMutation();
    const [Decrement] = useDecrementMutation();
    const { data: user } = useGetUserQuery() || {};
    const [deleteItemInCart] = useDeleteItemInCartMutation();
    const [newOrder, { isLoading, error: orderError }] = useNewOrderMutation();
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const [LoadPaypal] = useLoadPaypalMutation()
    const IncrementHandler = async () => {
        await Increment({ product_Id }).unwrap()
            .then((payload) => toast.success(payload.msg))
            .catch((error) => toast.error(error.data.msg));
    };
    const DecrementHandler = async () => {
        await Decrement({ product_Id }).unwrap()
            .then((payload) => toast.success(payload.msg))
            .catch((error) => toast.error(error.data.msg));
    }
    const DeleteItemHandler = async () => {
        await deleteItemInCart({ product_Id }).unwrap()
            .then((payload) => toast.success(payload.msg))
            .catch((error) => toast.error(error.data.msg));
    }
    const [success, setSuccess] = useState('')
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
            .then((payload) => setSuccess(payload.msg))
    }
    let purchaseprice = 0;
    // let totalProductPreice = 0;
    for (let i = 0; i < cart?.items?.length; i++) {
        purchaseprice += cart?.items[i].quentity * cart?.items[i].product_Id.price
        // totalProductPreice = cart?.items[i].quentity * cart?.items[i].product_Id.price;
    }
    return (
        <>
            <div>
                <Header />
                <ToastContainer position="bottom-center" closeOnClick autoClose={1200} hideProgressBar={true} limit={1} />
                <div className='container px-0 xl:px-4 max-w-[140rem]'>
                    <div className='grid grid-cols-1 xl:grid-cols-4'>
                        <div className='conatiner px-0 max-w-full col-span-3'>
                            {orderError && <Danger error={orderError?.data?.msg} className={'container my-5 px-0'} />}
                            {activateMSG && <MessageErrorActivate error={'Your email is not verified ,please verify it first before you continue to checkout'} className={'container my-5 px-0'} />}
                            {success && <Success error={success} className={'container my-5 px-0'} />}
                            <div className='conatiner px-0 max-w-full col-span-3 grid grid-cols-6'>
                                {addessPage ?
                                    <>
                                        <div className='col-span-1 space-y-3 hidden xl:block'>
                                            <p className='text-2xl font-medium text-gray-600'>Add New Address</p>
                                            <p className='mt-2 text-base font-semibold text-gray-500 leading-7'>Please provide us with with an address you usually in</p>
                                            <p><Link className='text-blue-400 hover:text-blue-500 underline font-bold mt-3'>Your Address</Link></p>
                                        </div>
                                        <div className='col-span-6 xl:col-span-5 container px-0'>
                                            <Address />
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
                                                            <Danger error={error?.data?.msg} className={'container my-5'} /> :
                                                            cart.items &&
                                                                cart?.items.length > 0 ?
                                                                cart.items?.map((child, index) => (
                                                                    <CartItem Mykey={index} Name={child.product_Id?.name} Src={child.product_Id?.images[0].url}
                                                                        Increment={() => { setID(child.product_Id?._id); IncrementHandler() }}
                                                                        Decrement={() => { setID(child.product_Id?._id); DecrementHandler() }}
                                                                        DeleteItem={() => { setID(child.product_Id?._id); DeleteItemHandler() }}
                                                                        Quentity={child.quentity}
                                                                        Price={child.product_Id.price}
                                                                    // ProductPrice={totalProductPreice}
                                                                    />
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
                                        <p className='text-lg text-green-500 font-bold'>{purchaseprice} EGP</p>
                                    </div>
                                </div>
                                <div className='flex justify-center mt-4'>
                                <PayPalButtons >
                                    Paypal
                                </PayPalButtons>
                                    <button onClick={NewOrderHandler} className='btn-success !mb-2 !block !w-3/4 !py-4 !rounded-3xl' disabled={isLoading}>
                                        {isLoading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'><ImSpinner7 /> </span> : 'Checkout'}</button>
                                </div>
                                <Link to='/' className='text-lg flex justify-center my-2 font-thin font-serif text-gray-500 hover:underline hover:text-blue-700'>Back to shoping</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container px-0 max-w-[170rem]'>
                <HomeProducts2 />
            </div>
            <Footer />
        </>
    )
}

export default Cart
