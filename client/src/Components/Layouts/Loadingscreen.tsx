'use client';
import Image from 'next/image';
import { FC } from 'react'
import { ImSpinner7 } from 'react-icons/im';
import Logo from './Logo';

interface loadingscreenProps {

}

const Loadingscreen: FC<loadingscreenProps> = ({ }) => {
    return (
        <div className="h-screen flex justify-center items-center text-7xl">
            <div className="">
                <Logo />
                <div className="text-blue-600 text-5xl py-8 animate-spin flex items-center justify-center">
                    <ImSpinner7 />
                </div>
            </div>
        </div>
    )
}

export default Loadingscreen