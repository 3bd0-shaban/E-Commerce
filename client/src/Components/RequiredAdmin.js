import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
// import { selectCurrentToken } from "../Redux/Slices/UserSlice"

const RequiredAdmin = () => {
    const { isAdmin } = useSelector(state => state.auth);
    // const token = useSelector(selectCurrentToken);
    const location = useLocation();
    return (
        isAdmin
            ? <Outlet />
            : <Navigate to="/notfound" state={{ from: location }} replace />
    )
}
export default RequiredAdmin