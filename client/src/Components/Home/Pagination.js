import React from 'react'
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Pagination = () => {
    const location = useLocation();
    const items = [1, 2, 3, 4, 5, 6, 7];
    const navigate = useNavigate();
    const pagenum = Number(location.search.replace(/\D/g, ''))
    const left = (e) => {
        e.preventDefault();
        navigate(`?page=${pagenum - 1}`);
    }
    const right = (e) => {
        e.preventDefault();
        navigate(`?page=${pagenum + 1}`)
    }
    return (
        <div className='flex gap-2 text-xl text-gray-700'>
            <button onClick={left} className={(pagenum === 1) ? 'text-gray-300' : ''} disabled={pagenum === 1}>
                <BiChevronLeft size={25} />
            </button>
            {items.map((i, index) => (
                <div className='' key={index}>
                    <Link to={`?page=${i}`}
                        className={`w-10 h-10 rounded-full hover:bg-gray-200 font-semibold flex items-center justify-center hover:text-gray-600 ${pagenum === i && `bg-blue-500 text-white hover:!bg-blue-500 hover:!text-white`}`}>{i}</Link>
                </div>
            ))}
            <button onClick={right} className={(pagenum === items.length) ? 'text-gray-300' : ''} disabled={pagenum === items.length}>
                <BiChevronRight size={25} />
            </button>
        </div>
    )
}

export default Pagination
