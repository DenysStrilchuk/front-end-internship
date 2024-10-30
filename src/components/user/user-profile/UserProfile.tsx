import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getMe, selectIsAuthenticated} from "../../../store/slices";

const UserProfile: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(getMe());
        }
    }, [dispatch, isAuthenticated, user]);


    if (!user) {
        return <p>Loading user data...</p>;
    }

    return (
        <div>
            <h2>Welcome, {user.result.user_firstname} {user.result.user_lastname}!</h2>
            <p>Email: {user.result.user_email}</p>
            <p>Status: {user.result.user_status}</p>
            <img src={user.result.user_avatar} alt="User Avatar"/>
        </div>
    );
};

export {UserProfile};
