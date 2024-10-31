import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getMe, selectIsAuthenticated } from "../../../store/slices";
import { UserUpdateForm } from "../../common/UserUpdateForm";
import { UserDeleteForm } from "../../common/UserDeleteForm";

const UserProfile = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const [error, setError] = useState<string | null>(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(getMe());
        }
    }, [dispatch, isAuthenticated, user]);

    const handleOpenUpdateForm = () => setShowUpdateForm(true);
    const handleCloseUpdateForm = () => setShowUpdateForm(false);
    const handleOpenDeleteForm = () => setShowDeleteForm(true);
    const handleCloseDeleteForm = () => setShowDeleteForm(false);

    if (!user) {
        return <p>Loading user data...</p>;
    }

    return (
        <div>
            <h2>Welcome, {user.result.user_firstname} {user.result.user_lastname}!</h2>
            <p>Email: {user.result.user_email}</p>
            <p>Status: {user.result.user_status}</p>
            <p>City: {user.result.user_city ?? "N/A"}</p>
            <p>Phone: {user.result.user_phone ?? "N/A"}</p>
            <img src={user.result.user_avatar} alt="User Avatar" />
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {showUpdateForm ? (
                <UserUpdateForm
                    userId={user.result.user_id}
                    userFirstname={user.result.user_firstname ?? ""}
                    userLastname={user.result.user_lastname ?? ""}
                    userStatus={user.result.user_status ?? ""}
                    userCity={user.result.user_city ?? ""}
                    userPhone={user.result.user_phone ?? ""}
                    onClose={handleCloseUpdateForm}
                    onError={setError}
                />
            ) : (
                <button onClick={handleOpenUpdateForm}>Update Profile</button>
            )}

            {showDeleteForm ? (
                <UserDeleteForm
                    userId={user.result.user_id}
                    onClose={handleCloseDeleteForm}
                    onError={setError}
                />
            ) : (
                <button onClick={handleOpenDeleteForm}>Delete Profile</button>
            )}
        </div>
    );
};

export { UserProfile };
