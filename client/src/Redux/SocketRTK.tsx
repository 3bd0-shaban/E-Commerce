'use client';
import { io, Socket } from 'socket.io-client';

const url: string = process.env.NEXT_PUBLIC_API_KEY ?? 'http://localhost:5000';
let socket: Socket;

const getSocket = (): Socket => {
    if (!socket) {
        socket = io(url, {
            withCredentials: true
        });
    }
    return socket;
};

export default getSocket;
