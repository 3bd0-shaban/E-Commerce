import { createContext, FC, useContext, useEffect, useState } from 'react';
import { useRefreshMutation } from '@Redux/APIs/AuthApi';
import { selectCurrentToken, setCredentials } from '@Redux/Slices/UserSlice';
import usePersist from '@Hooks/usePersist';
import { useAppDispatch, useAppSelector } from '@Hooks/useRedux';
import Loadingscreen from '@Components/Layouts/Loadingscreen';
import { userType } from '@lib/types/user';

interface AuthContextProps {
    token?: string;
    user?: userType
}


const AuthContext = createContext<AuthContextProps>({});

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

    const [persist] = usePersist();
    const token = useAppSelector(selectCurrentToken);
    const [authState, setAuthState] = useState<AuthContextProps>({});
    const dispatch = useAppDispatch();
    const [refresh, { isUninitialized, isLoading, isSuccess, isError }] = useRefreshMutation();

    useEffect(() => {
        if (persist && !token) {
            console.log('refreshing ...')
            refresh()
                .unwrap()
                .then(({ token, user }) => {
                    console.log(token)
                    dispatch(setCredentials({ token, user }));
                    setAuthState({ token, user })
                })
                .catch((err) => {
                    //Error here
                });
        }
    }, []);

    if (isLoading) {
        // console.log(isUninitialized)
        return <Loadingscreen />;
    }

    if (isError) {
        // handle error
    }

    return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
    const authState = useContext(AuthContext);
    return authState
};

export default useAuth;
