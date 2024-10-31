import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getMe, selectIsAuthenticated} from "../../../store/slices";
import {UserUpdateForm} from "../../common/UserUpdateForm";
import {UserDeleteForm} from "../../common/UserDeleteForm";
import {UpdateAvatar} from "../../common/UpdateAvatar";

const UserProfile = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const [error, setError] = useState<string | null>(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [showAvatarForm, setShowAvatarForm] = useState(false);

    useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(getMe());
        }
    }, [dispatch, isAuthenticated, user]);

    const handleOpenUpdateForm = () => setShowUpdateForm(true);
    const handleCloseUpdateForm = () => setShowUpdateForm(false);
    const handleOpenDeleteForm = () => setShowDeleteForm(true);
    const handleCloseDeleteForm = () => setShowDeleteForm(false);
    const handleOpenAvatarForm = () => setShowAvatarForm(true);
    const handleCloseAvatarForm = () => setShowAvatarForm(false);

    if (!user) {
        return <p>Loading user data...</p>;
    }

    return (
        <div>
            <img src={user.result.user_avatar} alt={t('profile.userAvatar')}/>
            <h2>{user.result.user_firstname} {user.result.user_lastname}</h2>
            <h2>{t('profile.myInformation')}</h2>
            <p>{t('profile.email')}: {user.result.user_email}</p>
            <p>{t('profile.city')}: {user.result.user_city ?? t('profile.noData')}</p>
            <p>{t('profile.phone')}: {user.result.user_phone ?? t('profile.noData')}</p>
            {error && <p style={{color: 'red'}}>{error}</p>}

            {showUpdateForm ? (
                <UserUpdateForm
                    userId={user.result.user_id}
                    userFirstname={user.result.user_firstname ?? ""}
                    userLastname={user.result.user_lastname ?? ""}
                    userCity={user.result.user_city ?? ""}
                    userPhone={user.result.user_phone ?? ""}
                    onClose={handleCloseUpdateForm}
                    onError={setError}
                />
            ) : (
                <button onClick={handleOpenUpdateForm}>{t('profile.updateProfile')}</button>
            )}

            {showDeleteForm ? (
                <UserDeleteForm
                    userId={user.result.user_id}
                    onClose={handleCloseDeleteForm}
                    onError={setError}
                />
            ) : (
                <button onClick={handleOpenDeleteForm}>{t('profile.deleteProfile')}</button>
            )}

            {showAvatarForm ? (
                <UpdateAvatar
                    userId={user.result.user_id}
                    onClose={handleCloseAvatarForm}
                />
            ) : (
                <button onClick={handleOpenAvatarForm}>{t('profile.uploadAvatar')}</button>
            )}
        </div>
    );
};

export {UserProfile};
