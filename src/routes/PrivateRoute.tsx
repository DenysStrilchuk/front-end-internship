import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

import {useAppSelector, useTokenExpiration} from "../hooks";
import {selectIsAuthenticated} from "../store/slices";
import {Routes} from "../utils";

const PrivateRoute = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    useTokenExpiration();

    return isAuthenticated ? <Outlet/> : <Navigate to={Routes.LOGIN}/>;
};

export {PrivateRoute}
