'use client';
import { useAppSelector } from "@Hooks/useRedux";
import { ChatType } from "@lib/types/chat";
import { useGetUserChatsQuery } from "@Redux/APIs/ChatApi";
import { selectCurrentUser } from "@Redux/Slices/UserSlice";
import Link from "next/link"
import { useParams } from "next/navigation";
import { BsJustifyLeft, BsThreeDotsVertical } from "react-icons/bs"

const Conversations = () => {
    const { data, isLoading, isError, error } = useGetUserChatsQuery({ page: 1 });
    const { chats } = data || {};
    const params: any = useParams()
    const username = params.username;
    const ChatCart = ({ cart }: { cart: ChatType }) => {
        const userInfo = useAppSelector(selectCurrentUser)
        const patientChat = cart?.members?.find(p => p._id != userInfo._id)
        return (
            <Link
                href={`/doctor/doctor-messages/${patientChat?.username}/${cart._id}`}
                aria-label='chat'

                className={`py-3 mx-2 flex justify-between px-3 rounded-xl hover:text-blue-500 hover:bg-blue-100 ${(patientChat?.username == username) && 'bg-gray-200'}`}
            >
                <div className='flex'>
                    <div>
                        <span
                            className='w-16 h-16 bg-red-800 rounded-full flex items-center justify-center text-white font-bold'>
                            BG
                        </span>
                    </div>
                    <div className='w-full px-3'>
                        <p className='font-[500] text-sm'>{patientChat?.firstname}</p>
                        <p className='text-xs text-gray-400 ellipse-2'>{cart?.lastMSG}</p>
                    </div>
                </div>
                <p>2h</p>
            </Link>
        )
    }

    return (
        <div className='h-full overflow-hidden'>
            <div className='p-5 px-2 flex justify-between items-center'>
                <div className='flex gap-1 items-center'>
                    <button
                        // onClick={() => dispatch(FeatureAction.setDocSide())}
                        aria-label='sidebar'
                        className='text-gray-500 lg:hidden text-lg lg:text-3xl'><BsJustifyLeft />
                    </button>
                    <h3 className='text-lg font-medium'>Chat Messages</h3>
                </div>
                <BsThreeDotsVertical />
            </div>
            <hr className='mb-2' />
            <div className='overflow-y-scroll hideScroll h-full'>
                {chats?.map(cart => (
                    <div key={cart._id}>
                        <ChatCart cart={cart} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Conversations