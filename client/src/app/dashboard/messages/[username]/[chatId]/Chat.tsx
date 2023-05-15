'use client';
import React, { useEffect, useState } from 'react'
import { FaRegSmile } from 'react-icons/fa'
import { IoImageOutline } from 'react-icons/io5'
import { useGetUserByIdQuery } from '@Redux/APIs/UserApi'
import { useNewMessageMutation } from '@Redux/APIs/MessageApi'
import { BiChevronLeft } from 'react-icons/bi'
import { motion } from 'framer-motion';
import AnimDropdown from '@Animation/AnimDropdown'
import { selectCurrentUser } from '@Redux/Slices/UserSlice'
import Link from 'next/link';
import InfinteScrollableChat from './InfinteScrollableChat';
import Image from 'next/image'
import { useAppSelector } from '@Hooks/useRedux';
import Emoji from '@Components/Layouts/Emoji';
import { userType } from '@lib/types/user';
import { useSocket } from '@Contexts/SocketContext';

const Chat = ({ params }: { params: { username: string; chatId: string } }) => {
    const { chatId, username } = params
    const { data, error } = useGetUserByIdQuery({ username });
    const { user } = data || {}
    const [MewMessage, { isLoading }] = useNewMessageMutation() || {};
    const [msg, setMSG] = useState<string>('');
    const { socket } = useSocket();
    const userInfo = useAppSelector(selectCurrentUser);
    const [isPikerVisiable, setIsPikerVisable] = useState(false);
    // useEffect(() => {
    //     console.log('socket')
    //     socket?.on("MessagetoClient", ({ image, sender, receiver, createdAt, chatId, msg }) => {
    //         console.log('in')
    //         console.log({ image, sender, receiver, createdAt, chatId, msg }
    //         )
    //     })

    // }, [socket])
    const NewMSG = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = { msg }
        MewMessage({ data, chatId }).unwrap()
            .then(({ message }) => {
                setMSG('')
                setIsPikerVisable(false);
                socket?.emit("typing", {
                    receiver: user?._id,
                    sender: userInfo._id,
                    status: false,
                    chatId: chatId
                });
                console.log(user?._id)
                socket?.emit("Message", {
                    receiver: user?._id,
                    sender: message.sender,
                    msg: message.msg,
                    createdAt: message.createdAt,
                    image: message.image,
                    chatId: message.chatId,
                });
            })
        // .catch(err => console.log(err))
    }

    return (
        <div className='h-full'>
            <div className='fixed md:static top-0 insetx-0 bg-white w-full flex border-b p-2 md:px-6 justify-between h-12'>
                <div className='flex'>
                    <Link
                        href='/'
                        className='block md:hidden'>
                        <BiChevronLeft size={30} />
                    </Link>
                    <Link
                        href={`/${user?.username}`}
                        className='flex gap-2 items-center'>
                        {user?.profilePicture &&
                            <Image
                                height={400}
                                width={400}
                                className="p-1 w-10 h-10 rounded-full object-cover focus:ring-2 focus:ring-gray-300"
                                src={user?.profilePicture}
                                alt=""
                            />
                        }
                        <div className=''>
                            <p className='my-auto'>
                                {user?.name}
                            </p>
                        </div>
                    </Link>
                </div>

            </div>
            <div className='h-full'>
                <>
                    <InfinteScrollableChat
                        userById={user as userType}
                        chatId={chatId}
                        // image={image}
                        isLoading={isLoading}
                    />

                    <form
                        onSubmit={NewMSG}
                        className='fixed md:absolute inset-x-0 bottom-4 mx-2 border
                            bg-white rounded-full w-[97%] mb-2 py-3 md:by-5 px-6 flex items-center mt-auto '
                    >

                        <>
                            <div className='text-2xl relative'>
                                <button
                                    type='button'
                                    onClick={() => setIsPikerVisable(!isPikerVisiable)}>
                                    <FaRegSmile />
                                </button>

                                {isPikerVisiable &&
                                    <motion.div
                                        variants={AnimDropdown}
                                        initial='initial'
                                        animate='animated'
                                        exit='exit'
                                        className='absolute z-10 bottom-12 -left-5'>
                                        <Emoji
                                            setComment={setMSG}
                                            comment={msg} />
                                    </motion.div>
                                }
                            </div>
                            <input
                                className='outline-none bg-transparent w-full mx-4'
                                onChange={(e) => {
                                    setMSG(e.target.value);
                                }}
                                onFocus={() => setIsPikerVisable(false)}
                                onKeyDown={() => socket?.emit("typing",
                                    {
                                        receiver: user?._id,
                                        sender: userInfo._id,
                                        status: true,
                                        chatId: chatId
                                    })}
                                onBlur={() => socket?.emit("typing",
                                    {
                                        receiver: user?._id,
                                        sender: userInfo._id,
                                        status: false,
                                        chatId: chatId
                                    }
                                )}
                                value={msg}
                                autoComplete='off'
                                placeholder='Message ...' />
                            {msg ?
                                <button type='submit' className='text-blue-500 font-semibold'>Send</button>
                                :
                                <div className='ml-auto flex text-2xl gap-4'>
                                    <label
                                        // onChange={loadFile}
                                        className='cursor-pointer'>
                                        <input type='file' className='hidden' />
                                        <IoImageOutline />
                                    </label>
                                </div>
                            }
                        </>
                    </form>
                </>
            </div>
        </div>
    )
}
export default Chat