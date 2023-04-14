import { selectCurrentToken } from '@Redux/Slices/UserSlice';
import jwtDecode from 'jwt-decode';
import { useAppSelector } from '@Hooks/useRedux';

interface AuthData {
    roles: string[];
    status: string;
    isAdmin: boolean;
}

const useAuth = (): AuthData => {
    const token = useAppSelector(selectCurrentToken);
    let isAdmin = false;
    let status = "User";
    let roles: string[] = [];

    if (token) {
        const decoded: { roles: string[] } = jwtDecode(token);
        roles = decoded.roles;

        isAdmin = roles.includes('admin');
        if (isAdmin) status = "admin";
    }

    return { roles, status, isAdmin };
};

export default useAuth;
