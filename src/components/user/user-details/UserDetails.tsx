import React, { useEffect } from "react";
import { Typography, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchUserById } from "../../../store/slices";
import { UserDetailsView } from "../../common/UserDetailsView";

const UserDetails = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const user = useAppSelector((state) => state.users.userDetail);
    const loading = useAppSelector((state) => state.users.loading);
    const error = useAppSelector((state) => state.users.error);

    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(Number(id)));
        }
    }, [dispatch, id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography variant="h6" color="error">Error: {error}</Typography>;
    }

    if (!user) {
        return <Typography variant="h6" color="error">User not found</Typography>;
    }

    return (
        <UserDetailsView
            data={[user]}
            idKey="user_id"
            renderDetails={(user) => (
                <>
                    <Typography variant="h5">{t('user.details')}</Typography>
                    {user.user_avatar && (
                        <img
                            src={user.user_avatar}
                            alt={`${user.user_firstname} ${user.user_lastname}`}
                            style={{ width: 100, height: 100, borderRadius: '50%' }}
                        />
                    )}
                    <Typography variant="body1">{t('user.name')}: {user.user_firstname}</Typography>
                    <Typography variant="body1">{t('user.lastName')}: {user.user_lastname}</Typography>
                    <Typography variant="body1">{t('user.email')}: {user.user_email}</Typography>
                    <Typography variant="body1">{t('user.city')}: {user.user_city}</Typography>
                    <Typography variant="body1">{t('user.phone')}: {user.user_phone}</Typography>
                </>
            )}
        />
    );
};

export { UserDetails };
