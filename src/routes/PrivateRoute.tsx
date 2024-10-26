import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

import {useAppSelector} from "../hooks";
import {selectIsAuthenticated} from "../store/slices/authSlice";

const PrivateRoute = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    return isAuthenticated ? <Outlet/> : <Navigate to="/login"/>;
};

export {PrivateRoute}
