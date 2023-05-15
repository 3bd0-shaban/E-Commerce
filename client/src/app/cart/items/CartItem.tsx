'use client';

import {
    useDecrementMutation,
    useDeleteItemInCartMutation,
    useIncrementMutation
} from '@Redux/APIs/CartApi';
import { cartItem } from '@lib/types/cart';
import { productType } from '@lib/types/product';
import Image from 'next/image';
import { AiOutlineHeart } from 'react-icons/ai';
import { toast } from 'react-toastify';

interface ItemProps {
    created: string;
    quentity: number;
    _id: string;
    product_Id: productType;
}

const CartItem: React.FC<{ item: cartItem }> = ({ item }) => {
    const [Increment] = useIncrementMutation();
    const [Decrement] = useDecrementMutation();
    const [deleteItemInCart] = useDeleteItemInCartMutation();

    const IncrementHandler = async (product_Id: string) => {
        await Increment({ product_Id }).unwrap()
            .then((payload) => toast.success(payload.message))
            .catch((error) => toast.error(error.data.message));
    };
    const DecrementHandler = async (product_Id: string) => {
        await Decrement({ product_Id }).unwrap()
            .then((payload) => toast.success(payload.message))
            .catch((error) => toast.error(error.data.message));
    }
    const DeleteItemHandler = async (product_Id: string) => {
        await deleteItemInCart({ product_Id }).unwrap()
            .then((payload) => toast.success(payload.message))
            .catch((error) => toast.error(error.data.message));
    }
    return (
        <div key={item._id}>
            <hr />
            <div className='select-none rounded-xl relative py-2 mt-5'>
                <div className='flex'>
                    <Image
                        height={200}
                        width={200}
                        draggable={false} className='h-52 m-2 object-cover'
                        src={item.product_Id?.images[0].url as string}
                        alt=''
                    >
                    </Image>
                    <div className=''>
                        <p className='py-3 text-lg'>{item.product_Id?.name}</p>
                        <p className='py-3 text-lg'>{item.product_Id?.price} EGP</p>
                        <div className='flex items-end mb-10'>
                            <div>
                                <div className='flex items-center gap-3 justify-between py-3'>
                                    <div className='flex items-center gap-3'>
                                        <label>Select Quentity</label>
                                        <button
                                            onClick={() => IncrementHandler(item.product_Id._id as string)}
                                            className='text-3xl font-semibold'>
                                            +
                                        </button>
                                        <div className='p-2 borber'>{item.quentity}</div>
                                        <button
                                            onClick={() => DecrementHandler(item.product_Id?._id as string)}
                                            className='text-3xl font-semibold'>
                                            -
                                        </button>
                                    </div>
                                </div>
                                <div className='flex gap-3'>
                                    <button
                                        onClick={() => DeleteItemHandler(item.product_Id?._id as string)}
                                        className='text-teal-800 font-semibold'>
                                        Remove
                                    </button>
                                    <div className='flex items-center gap-1 text-orange-800 '>
                                        <AiOutlineHeart />
                                        <button className='font-semibold'>Add to white list</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem