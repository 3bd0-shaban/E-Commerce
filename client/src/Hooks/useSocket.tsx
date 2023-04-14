'use client';
import SocketContext from "@Contexts/SocketContext";
import { useContext } from "react";

const useSocket = () => {
    const socket = useContext(SocketContext);

    return socket;
};
export default useSocket