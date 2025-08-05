import useAuth from '../hooks/useAuth.tsx';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

function RequireAuth() {
    const {auth} = useAuth()
    const location = useLocation()

    return auth?.name ? (
        <Outlet/>
    ) : (
        <Navigate to="login" state={{from: location}} replace/>
    )
}

export default RequireAuth;