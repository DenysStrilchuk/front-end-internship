import React, {useEffect} from "react";
import {Typography, CircularProgress} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchUserById} from "../../store/slices";
import {ProfileView} from "../common/ProfileView/";

const UserProfile = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const {id} = useParams<{ id: string }>();
    const user = useAppSelector((state) => state.users.userDetail);
    const loading = useAppSelector((state) => state.users.loading);
    const error = useAppSelector((state) => state.users.error);

    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(Number(id)));
        }
    }, [dispatch, id]);

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return <Typography variant="h6" color="error">Error: {error}</Typography>;
    }

    if (!user) {
        return <Typography variant="h6" color="error">User not found</Typography>;
    }

    return (
        <ProfileView
            data={[user]}
            idKey="user_id"
            renderDetails={(user) => (
                <>
                    <Typography variant="h5">{t('user.profile')}</Typography>
                    <Typography variant="body1">{t('name')}: {user.user_firstname}</Typography>
                    <Typography variant="body1">{t('email')}: {user.user_email}</Typography>
                </>
            )}
        />
    );
};

export {UserProfile};
