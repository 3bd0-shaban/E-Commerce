import { AiOutlineHeart } from 'react-icons/ai';

const CartItem = (props) => {
    return (
        <><hr />
            <div key={props.Mykey} className=' rounded-xl relative py-2 my-5'>
                <div className='flex'>
                    <img className='h-52 m-2 object-cover' src={props.Src} alt=''></img>
                    <div className=''>
                        <p className='py-3 text-lg'>{props.Name}</p>
                        <p className='py-3 text-lg'>{props.Price}</p>
                        <div className='absolute bottom-0 mb-10'>
                            <div className='flex items-center gap-3 justify-between py-4'>
                                <div className='flex items-center gap-3'>
                                    <label>Select Quentity</label>
                                    <button onClick={props.Increment} className='text-3xl font-semibold'>+</button>
                                    <div className='p-2 borber'>{props.Quentity}</div>
                                    <button onClick={props.Decrement} className='text-3xl font-semibold'>-</button>
                                </div>
                                <p>{props.ProductPrice}</p>
                            </div>
                            <div className='flex gap-3'>
                                <button onClick={props.DeleteItem} className='text-teal-800 font-semibold'>Remove</button>
                                <div className='flex items-center gap-1 text-orange-800 '>
                                    <AiOutlineHeart />
                                    <button className='font-semibold'>Add to white list</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItem