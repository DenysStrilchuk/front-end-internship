import React, {useEffect} from 'react';
import {Navigate, Outlet} from 'react-router-dom';

import {useAppDispatch, useAppSelector, useTokenExpiration} from "../hooks";
import {authActions, selectIsAuthenticated} from "../store/slices";
import {Routes} from "../utils";

const PrivateRoute = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    useTokenExpiration();

    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(authActions.setToken(JSON.parse(token)));
        }
    }, [dispatch]);

    return isAuthenticated ? <Outlet/> : <Navigate to={Routes.LOGIN}/>;
};

export {PrivateRoute}
