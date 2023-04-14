'use client';
import { usePathname } from 'next/navigation';
import { createContext, FC, useContext } from 'react'

interface PathContextProps {
    isDash: Boolean;
}
export const PathContext = createContext<PathContextProps>({ isDash: false })

export const PathProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const path = usePathname()
    const isDash = path.includes('dashboard')
    return <PathContext.Provider value={{ isDash }}>{children}</PathContext.Provider>;

}
