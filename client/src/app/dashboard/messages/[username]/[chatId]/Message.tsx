'use client';
import { MessageType } from '@lib/types/message';
import moment from 'moment'
import Image from 'next/image';
import React from 'react'
interface MessageProps {
    message: MessageType;
    patient: Boolean;
}
const Message: React.FC<MessageProps> = ({ message, patient }) => {
    return (
        <div className='pt-3 p-3'>
            {message?.msg &&
                <>
                    <div className={`flex ${patient ? 'justify-start' : 'justify-end'}`}>
                        <div className={`border h-10 rounded-2xl flex items-center px-5 py-5 ${patient ? 'justify-start' : 'justify-end bg-gray-200'}`}>
                            <p>{message?.msg}</p>
                        </div>
                    </div>
                    <div className={`flex ${patient ? 'justify-start' : 'justify-end'}`}>
                        <p className={`text-[.75rem] mx-1 text-gray-500 ${patient ? 'justify-start' : 'justify-end'}`}>
                            {moment(message.createdAt).startOf('hour').fromNow()}
                        </p>
                    </div>
                </>
            }
            {message?.image &&
                <div className={`flex text-right ${patient ? 'justify-start' : 'justify-end'}`}>
                    <Image
                        src={message?.image}
                        height={400}
                        width={400}
                        className='max-w-[10rem] md:max-w-[15rem] rounded-xl'
                        alt=''
                    />
                </div>
            }
        </div>
    )
}

export default Message
