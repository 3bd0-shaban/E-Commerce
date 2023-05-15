'use client';
import { useEffect, useState } from 'react';

interface WindowSize {
    width: number | undefined;
    height: number | undefined;
}

interface Breakpoints {
    [key: number]: string;
}

const useBreakpoint = () => {
    const breakpoints: Breakpoints = {
        0: 'xs',
        576: 'sm',
        768: 'md',
        992: 'lg',
        1200: 'xl',
        1400: 'xxl',
        1600: 'xxxl',
    };
    const [breakpoint, setBreakPoint] = useState<string>('');
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: undefined,
        height: undefined,
    });
    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        if (0 < windowSize.width! && windowSize.width! < 576) {
            setBreakPoint(breakpoints[0]); //xs mobile
        }
        if (576 < windowSize.width! && windowSize.width! < 768) {
            setBreakPoint(breakpoints[576]); //sm
        }
        if (768 < windowSize.width! && windowSize.width! < 992) {
            setBreakPoint(breakpoints[768]); //md
        }
        if (992 < windowSize.width! && windowSize.width! < 1200) {
            setBreakPoint(breakpoints[992]); //lg
        }
        if (1200 < windowSize.width! && windowSize.width! < 1400) {
            setBreakPoint(breakpoints[1200]); //xl
        }
        if (1400 < windowSize.width! && windowSize.width! < 1600) {
            setBreakPoint(breakpoints[1400]); //xxl
        }
        if (windowSize.width! >= 1600) { //xxxl
            setBreakPoint(breakpoints[1600]);
        }
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line
    }, [windowSize.width]);

    const MobileView = (breakpoint === 'xs') || (breakpoint === 'sm') || (breakpoint === 'md');
    return { breakpoint, MobileView };
};

export default useBreakpoint;
