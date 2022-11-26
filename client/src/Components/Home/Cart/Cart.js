import React, { useEffect } from 'react';
import { Header, CartItem } from '../../Exports';
import { FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dectrement, Fetch_Products_In_Cart } from '../../../Redux/Actions/CartAction';
import { Increment } from './../../../Redux/Actions/CartAction';
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
    const { cart, loading } = useSelector((state) => state.Cart);
    useEffect(() => {
        dispatch(Fetch_Products_In_Cart())
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
                            <p className='mx-auto'>you have {cart.numofitems} items in your cart</p>
                        </div>
                        <div>
                            {loading ? <p className='text-3xl font-bold flex justify-center items-center'>loading</p> :
                                cart.items?.map((child) => (
                                    <CartItem Mykey={child.product_Id._id} Name={child.product_Id.name} Src={child.product_Id.images[0].url}
                                        // Increment={() => { const product_Id = child.product_Id._id; dispatch(Increment(product_Id)) }}
                                        // Decrement={() => { const product_Id = child.product_Id._id; dispatch(Dectrement(product_Id)) }}
                                        Quentity={child.quentity} />
                                ))
                            }
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
                            <p className='text-lg text-green-500 font-bold'>{cart.purchaseprice} EGP</p>
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
