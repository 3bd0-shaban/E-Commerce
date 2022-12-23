import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

const RequireAuth = () => {
    const [cookies] = useCookies(['Logged_in']);
    const { user } = useSelector(state => state.auth)
    const isUser = user[0]._id;
    const location = useLocation();
    return (
        cookies.Logged_in === isUser
            ? <Outlet />
            : <Navigate to="/signin" state={{ from: location }} replace />
    )
}
export default RequireAuth