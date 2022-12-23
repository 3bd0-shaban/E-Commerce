import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../Redux/Slices/UserSlice"

const RequireAuth = () => {
    // const { isLogged } = useSelector(state => state.auth);
    const token = useSelector(selectCurrentToken);
    const location = useLocation();
    return (
        token
            ? <Outlet />
            : <Navigate to="/signin" state={{ from: location }} replace />
    )
}
export default RequireAuth