'use client';
import { io } from 'socket.io-client';
import { createContext, FC, useEffect, useRef, ReactNode, useContext } from 'react';
import { useAppSelector } from '@Hooks/useRedux';
import { selectCurrentUser } from '@Redux/Slices/UserSlice';

const url = process.env.NEXT_PUBLIC_API_KEY;
const SocketContext = createContext({});

export const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const socket = useRef(io(url));

    const user = useAppSelector(selectCurrentUser)
    const userId = user._id
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
export const useSocket = () => {
    const socket = useContext(SocketContext);

    return socket as any;
};
export default SocketProvider;
