import { BsThreeDotsVertical, BsJustifyLeft } from 'react-icons/bs';
import { Link, useSearchParams } from 'react-router-dom'
import { ChatBox, useBreakpoint } from '../../Exports'
import { FeaturesAction } from '../../../Redux/Slices/FeaturesSlice';
import { useDispatch } from 'react-redux';

const Messages = () => {
    const { breakpoint, MobileView } = useBreakpoint();
    const [SearchQuery] = useSearchParams();
    const dispatch = useDispatch();
    const chatId = SearchQuery.get('chatId')
    const xl = (breakpoint === 'xl')
    const mobile = MobileView || xl
    const Users = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    const PatientMessageCard = () => {
        return (
            <div className='h-full overflow-hidden'>
                <div className='p-5 px-2 flex justify-between items-center'>
                    <div className='flex gap-1 items-center'>
                        <button
                            onClick={() => dispatch(FeaturesAction.setDocSide(true))}
                            className='text-gray-500 lg:hidden text-lg lg:text-3xl'><BsJustifyLeft />
                        </button>
                        <h3 className='text-lg font-medium'>Chat Messages</h3>
                    </div>
                    <BsThreeDotsVertical />
                </div>
                <hr className='mb-2' />
                <div className='overflow-y-scroll hideScroll h-full'>
                    {Users?.map(card => (
                        <Link to='?chatId=6523&userId=2154651' key={card} className='py-3 mx-2 flex justify-between px-3 rounded-xl hover:text-blue-500 hover:bg-blue-100'>
                            <div className='flex'>
                                <div>
                                    <span className='w-16 h-16 bg-red-800 rounded-full flex items-center justify-center text-white font-bold'>BG</span>
                                </div>
                                <div className='w-full px-3'>
                                    <p className='font-[500] text-sm'>Derpy MAX3</p>
                                    <p className='text-xs text-gray-400 ellipse-2'>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </div>
                            </div>
                            <p>2h</p>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }
    return (
        <div className='container -py-5 max-w-full'>
            <div className='grid grid-cols-4 gap-5 h-[85vh]'>
                {(!chatId || !mobile) &&
                    <div className='sm:shadow-[.2px_.2px_3px_1px] sm:shadow-gray-200 overflow-hidden rounded-xl col-span-4 lg:col-span-4 xxl:col-span-1 h-screen md:h-[90vh]'>
                        <PatientMessageCard />
                    </div>}
                {(chatId || !mobile) &&
                    <div className='sm:shadow-[.2px_.2px_3px_1px] sm:shadow-gray-200 overflow-hidden col-span-4 md:col-span-4 xxl:col-span-3 rounded-xl relative w-full md:h-[90vh]'>
                        <ChatBox />
                    </div>}
            </div>
        </div>
    )
}

export default Messages
