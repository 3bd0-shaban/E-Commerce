'use client';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import useAuth from './AuthContext';

interface UserContextProps {
    isPatient: Boolean;
    isDoctor: Boolean;
    isAdmin: Boolean;
}
const UserContext = createContext<UserContextProps>({
    isPatient: false,
    isDoctor: false,
    isAdmin: false,
})

export const UserProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPatient, setIsPatient] = useState<Boolean>(false);
    const [isDoctor, setIsDoctor] = useState<Boolean>(false);
    const [isAdmin, setIsAdmin] = useState<Boolean>(false);
    const authState = useAuth();

    useEffect(() => {
        if (authState.user?.__t === 'Patient') {
            setIsPatient(true)
        }
        if (authState.user?.__t === 'Doctor') {
            setIsDoctor(true)
        }
        if (authState.user?.__t === 'Admin') {
            setIsAdmin(true)
        }
    }, [authState]);

    return <UserContext.Provider value={{ isPatient, isDoctor, isAdmin }}>{children}</UserContext.Provider>;
}


export const useUser = (): UserContextProps => {
    const { isPatient, isDoctor, isAdmin } = useContext(UserContext);
    return { isPatient, isDoctor, isAdmin }
};