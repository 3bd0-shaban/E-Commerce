import { useLocation, Navigate, Outlet } from "react-router-dom"
// import { useCookies } from 'react-cookie';
// import { useSelector } from 'react-redux';
import { useGetUserQuery } from "../Redux/APIs/AuthApi";

const RequiredAdmin = () => {
    // const [cookies] = useCookies(['Admin']);
    // const { user } = useSelector(state => state.auth);
    // const admin = user[0].role === "admin";
    const { data } = useGetUserQuery() || {};
    const admin = data[0].role === "admin";
    console.log(admin)
    const location = useLocation();
    return (
        admin
            ? <Outlet />
            : <Navigate to="/notfound" state={{ from: location }} replace />
    )
}
export default RequiredAdmin