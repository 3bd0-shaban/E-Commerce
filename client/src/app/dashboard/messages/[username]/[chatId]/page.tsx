import React from 'react'
import Chat from './Chat';

export default function page({ params }: { params: { username: string; chatId: string } }) {
    return <Chat params={params} />
}
