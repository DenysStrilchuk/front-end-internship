import React, {useEffect} from 'react';
import {Navigate, Outlet} from 'react-router-dom';

import {useAppDispatch, useAppSelector, useTokenExpiration} from "../hooks";
import {authActions, selectIsAuthenticated} from "../store/slices";
import {Routes} from "../utils/routes";
import {tokenService} from "../api/token-service";

const PrivateRoute = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    useTokenExpiration();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(authActions.setToken(JSON.parse(token)));
        }
        if (!isAuthenticated) {
            tokenService.removeToken();
            dispatch(authActions.clearToken());
        }
    }, [dispatch, isAuthenticated]);

    return isAuthenticated ? <Outlet/> : <Navigate to={Routes.LOGIN}/>;
};

export {PrivateRoute};
