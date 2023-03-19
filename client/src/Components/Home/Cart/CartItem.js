import { AiOutlineHeart } from 'react-icons/ai';

const CartItem = (props) => {
    return (
        <div key={props.Mykey}>
            <hr />
            <div className='select-none rounded-xl relative py-2 mt-5'>
                <div className='flex'>
                    <img draggable={false} className='h-52 m-2 object-cover' src={props.Src} alt=''></img>
                    <div className=''>
                        <p className='py-3 text-lg'>{props.Name}</p>
                        <p className='py-3 text-lg'>{props.Price} EGP</p>
                        <div className='flex items-end mb-10'>
                            <div>
                                <div className='flex items-center gap-3 justify-between py-3'>
                                    <div className='flex items-center gap-3'>
                                        <label>Select Quentity</label>
                                        <button onClick={props.Increment} className='text-3xl font-semibold'>+</button>
                                        <div className='p-2 borber'>{props.Quentity}</div>
                                        <button onClick={props.Decrement} className='text-3xl font-semibold'>-</button>
                                    </div>
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
            </div>
        </div>
    )
}

export default CartItem