import React, { use } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import Loader from './loader/Loader';
import { Navigate, useLocation } from 'react-router';

const PrivetRout = ({children}) => {
    const { loader, user } = use(AuthContext)
    const location = useLocation()

    if (loader) {
        return <Loader></Loader>
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
    return children
};

export default PrivetRout;