'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react'

export const Scrollup = () => {
    const pathname = usePathname();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
}

export const Scrolldown = () => {
    const pathname = usePathname();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
}