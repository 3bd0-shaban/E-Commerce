'use client';
import { io } from 'socket.io-client';
import { createContext, FC, useEffect, useRef, ReactNode } from 'react';

const url: string | undefined = process.env.NEXT_PUBLIC_API_KEY ?? 'http://localhost:5000';
const SocketContext = createContext({});

export const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const socket = useRef(io(url));

    const userId = localStorage.getItem('id');

    useEffect(() => {
        if (userId) {
            socket.current?.on('connect', () => {
                // socket.current.emit('join', userId);
            });

            // socket.current.on('getusers', (data) => {
            //     console.log(data)
            // });
        }
    }, [userId, socket]);

    return <SocketContext.Provider value={{ socket: socket.current }}>{children}</SocketContext.Provider>;
};

export default SocketContext;
