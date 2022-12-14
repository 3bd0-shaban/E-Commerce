import { TbAlertCircle } from 'react-icons/tb'
import { IoIosClose } from 'react-icons/io'
import { FeaturesAction } from './../../../../Redux/Slices/FeaturesSlice';
import { useDispatch } from 'react-redux';
import Bounce from 'react-reveal/Bounce';
const ModalConfirm = (props) => {
    const dispatch = useDispatch();
    return (
        <>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity z-40"></div>
            <Bounce down>
                <div className="flex fixed z-50 inset-0 justify-center items-center">
                    <div className="relative p-4  max-w-md ">
                        <div className="relative bg-white rounded-lg shadow-[0_0px_100px_10px_rgba(0,0,0,0.3)]">
                            <button onClick={() => dispatch(FeaturesAction.Show_ModalConfirm(false))} className="absolute top-3 right-2.5 text-gray-400 bg-transparent duration-200 hover:bg-gray-200 focus:bg-gray-300 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="popup-modal">
                                <IoIosClose style={{ 'fontSize': '1.5rem' }} />
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-center">
                                <div className='mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200'>
                                    <TbAlertCircle style={{ 'fontSize': '3rem' }} />
                                </div>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{props.Message}</h3>
                                <button onClick={props.onAgree} className="text-white bg-red-500 duration-200 hover:bg-red-600 focus:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    Yes, I'm sure
                                </button>
                                <button onClick={() => dispatch(FeaturesAction.Show_ModalConfirm(false))} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none duration-200 focus:bg-gray-300 focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900">No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Bounce>
        </>
    )
}

export default ModalConfirm