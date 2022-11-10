import React, { useEffect } from 'react';
import { Header } from '../../Exports';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Fetch_Products_In_Cat } from '../../../Redux/Actions/CartAction';
// eslint-disable-next-line
const CartItem = (props) => {
    return (
        <div className='bg-white shadow rounded-xl relative py-2 my-5'>
            <div className='flex'>
                <img className='h-52 m-2' src='https://res.cloudinary.com/abdo9/image/upload/v1667474833/Market/ni8yf7vmez5iahqieck0.webp' alt=''></img>
                <div className=''>
                    <p className='py-3 text-lg'>{props.Name}</p>
                    <div className='absolute bottom-0 mb-10'>
                        <div className='flex items-center gap-3 py-4'>
                            <label>Select Quentity</label>
                            <select className='border rounded-lg outline-none'>
                                <option>1</option>
                            </select>
                        </div>
                        <div className='flex gap-3'>
                            <button className='text-teal-800 font-semibold'>Remove</button>
                            <div className='flex items-center gap-1 text-orange-800 '>
                                <AiOutlineHeart />
                                <button className='font-semibold'>Add to white list</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
// eslint-disable-next-line
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
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.Cart);
    useEffect(() => {
        dispatch(Fetch_Products_In_Cat())
    }, [dispatch])

    return (
        <div>
            <Header />
            <div className='grid grid-cols-1 lg:grid-cols-3 h-screen'>
                <div className='col-span-2 bg-[#F6F8F9]'>
                    <div className='container max-w-6xl'>
                        <div className=''>
                            <div className='flex justify-center py-4'>
                                <p className='text-3xl font-medium font-Permanent'>Shopping Cart</p>
                            </div>
                            {/* <p className='mx-auto'>you have 2 items in your cart</p> */}
                        </div>
                        <div>
                            <CartItem Name={cart.User_Cart[0]._id} />
                            {/* <CartEmpty /> */}
                        </div>
                    </div>
                </div>
                <div className='container max-w-md'>
                    <p className='text-3xl'>Order Summary</p>
                    <div>
                        <div className='flex justify-between py-2'>
                            <p>item :</p>
                            <p className='text-lg text-green-500 font-bold'>500 EGP</p>
                        </div>
                        <div className='flex justify-between py-2'>
                            <p>Shipping :</p>
                            <p className='text-lg text-green-500 font-bold'>50 EGP</p>
                        </div>
                        <div className='flex justify-between py-2'>
                            <p className='text-xl text-red-700 font-bold'>Order Total</p>
                            <p className='text-lg text-green-500 font-bold'>50 EGP</p>
                        </div>
                    </div>
                    <div className='flex justify-center mt-4'>
                        <button className='btn-primary w-1/2 bg-green-700'>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
