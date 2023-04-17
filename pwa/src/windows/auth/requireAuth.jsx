import {useLocation,Navigate,Outlet,Redirect} from 'react-router-dom';
import { AuthContext } from '../../context/authcontext';
import { useContext } from 'react';

const ProtectedRoute = () =>{
    const {currentUser} = useContext(AuthContext);
    const location = useLocation();
    return(
        currentUser? <Outlet />
    : <Navigate to='/login' state={{from:location}} replace/>
    );

}

export default ProtectedRoute;