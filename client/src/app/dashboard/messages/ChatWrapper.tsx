'use client';
import useBreakpoint from '@Hooks/useBreakpoint';
import { useParams } from 'next/navigation';
import Conversations from './Conversations';

interface Params {
    [key: string]: string | string[];
    chatId: string;
}


const ChatWrapper = ({ children }: { children: React.ReactNode }) => {
    const params: any = useParams()
    const chatId = params.chatId;
    const { breakpoint, MobileView } = useBreakpoint();
    const xl = (breakpoint === 'xl')
    const mobile = MobileView || xl;

    return (
        <div className='grid grid-cols-4 gap-5 h-[85vh]'>
            {(!chatId || !mobile) &&
                <div className='sm:shadow-[.2px_.2px_3px_1px] sm:shadow-gray-200 overflow-hidden rounded-xl col-span-4 lg:col-span-4 xxl:col-span-1 h-screen md:h-[85vh]'>
                    <Conversations />
                </div>
            }
            {(chatId || !mobile) &&
                <div className='sm:shadow-[.2px_.2px_3px_1px] sm:shadow-gray-200 overflow-hidden col-span-4 md:col-span-4 xxl:col-span-3 rounded-xl relative w-full md:h-[85vh]'>
                    {children}
                </div>
            }
        </div>
    )
}

export default ChatWrapper