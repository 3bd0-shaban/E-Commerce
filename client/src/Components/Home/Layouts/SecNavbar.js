import { Link } from "react-router-dom"
import { IoPersonOutline } from 'react-icons/io5'
// import { CiShoppingTag } from 'react-icons/ci'
const SecNavbar = () => {

    return (
        <div className='container max-w-[140rem] px-8'>
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
    )
}

export default SecNavbar
