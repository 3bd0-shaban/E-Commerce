import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

const RequiredAdmin = () => {
    const [cookies] = useCookies(['Admin']);
    const { user } = useSelector(state => state.auth)
    const admin = user[0]._id;
    const location = useLocation();
    console.log(cookies.Admin, admin)
    return (
        cookies.Admin === admin
            ? <Outlet />
            : <Navigate to="/notfound" state={{ from: location }} replace />
    )
}
export default RequiredAdmin