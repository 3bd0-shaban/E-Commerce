'use client';
import { FC } from 'react'
import { ToastContainer } from 'react-toastify'

interface ToastProps {
  
}

const Toast: FC<ToastProps> = ({}) => {
    return <ToastContainer
        position="bottom-center"
        closeOnClick autoClose={1200}
        hideProgressBar={true}
        limit={1}
    />
}

export default Toast