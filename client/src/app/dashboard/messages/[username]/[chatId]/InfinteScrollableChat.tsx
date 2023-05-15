'use client';
import React, { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Message from './Message';
import { MessageApi, useGetMessagesQuery } from '@Redux/APIs/MessageApi';
import { ImSpinner3 } from 'react-icons/im';
import useBreakpoint from '@Hooks/useBreakpoint';
import GetError from '@lib/GetError';
import { useAppDispatch } from '@Hooks/useRedux';
import { userType } from '@lib/types/user';
import Image from 'next/image';

interface InfinteScrollableChatProps {
    userById: userType;
    chatId: string;
    image?: string;
    isLoading: Boolean;
}

const InfinteScrollableChat: React.FC<InfinteScrollableChatProps> = ({ userById, chatId, image, isLoading }) => {
    const { MobileView } = useBreakpoint();

    const ScrollRef = useRef<HTMLInputElement>(null);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const dispatch = useAppDispatch();
    const { data, isLoading: loadingMSGs, isError, error } = useGetMessagesQuery({ chatId, page: 1 }, {
        refetchOnMountOrArgChange: true,
    });
    const { messages, status, results } = data || {};

    useEffect(() => {
        ScrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        // ScrollRef.current?.focus();
        window.scrollTo({
            top: 100,
            left: 100,
            behavior: 'smooth'
        });
    }, [messages]);

    // useEffect(() => {
    //     window.scrollTo({
    //         bottom: 0,
    //         left: 0,
    //         behavior: "smooth"
    //     })
    // }, [messages])
    useEffect(() => {
        if (page > 1) {
            dispatch(
                MessageApi.endpoints.GetMoreMessages.initiate({
                    chatId,
                    page,
                })
            );
        }
    }, [page, dispatch, chatId]);

    useEffect(() => {
        if (results === 0) {
            setHasMore(false);
        }
    }, [results, page]);
    if (!messages) {
        return null
    }
    return (
        loadingMSGs ?
            <p></p> :
            isError ?
                <GetError error={error} /> :
                <div id="scrollableDiv">
                    <InfiniteScroll
                        dataLength={messages.length}
                        next={() => setPage((prevPage) => prevPage + 1)}
                        hasMore={hasMore}
                        inverse={true}
                        // hasChildren={true}
                        loader={
                            <div className='flex justify-center items-center my-5 animate-spin'>
                                <ImSpinner3 size={25} />
                            </div>
                        }
                        endMessage={
                            <div className='flex justify-center my-5 text-lg font-semibold'>
                                <p>You see it all</p>
                            </div>}
                        height={MobileView ? (window.innerHeight - 80) : (window.innerHeight - 270)}
                        className='hideScrollBare flex flex-col-reverse'
                        scrollableTarget="scrollableDiv"
                    >
                        {image &&
                            <div className='flex justify-end m-3'>
                                <div className='max-w-[10rem] md:max-w-[15rem] relative'>
                                    <div className='aspect-square'>
                                        <Image
                                            height={400}
                                            width={400}
                                            src={image}
                                            // accept="image/*"
                                            alt=''
                                            className='rounded-xl w-full flex justify-end'
                                        />
                                    </div>
                                    {isLoading && <div className='absolute inset-0 bg-white/50 flex justify-center items-center text-gray-500'>
                                        <span className=' animate-spin'> <ImSpinner3 size={30} /></span>
                                    </div>}
                                </div>
                            </div>}
                        {/* {typing && <p className='m-3'>typing ....</p>} */}
                        {messages?.map((message, index) => (
                            <div ref={ScrollRef} key={index}>
                                <Message
                                    message={message}
                                    patient={message?.sender === userById?._id}
                                />
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
    )
}

export default InfinteScrollableChat
