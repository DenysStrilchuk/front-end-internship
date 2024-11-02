import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, Stack, CircularProgress, Alert, Avatar, Divider, Paper } from '@mui/material';
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getMe, selectIsAuthenticated } from "../../../store/slices";
import { UserUpdateForm } from "../../common/UserUpdateForm";
import { UserDeleteForm } from "../../common/UserDeleteForm";
import { UpdateAvatar } from "../../common/UpdateAvatar";
import { UniversalModal } from "../../common/UniversalModal";

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
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress color="primary" size={50} />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <Paper sx={{ p: 3, width: { xs: '100%', md: '30%' }, textAlign: "center" }}>
                    <Avatar
                        src={`${user.result.user_avatar}?timestamp=${Date.now()}`}
                        alt={t('profile.userAvatar')}
                        sx={{
                            width: 150,
                            height: 150,
                            margin: "0 auto",
                            mb: 2,
                            border: '4px solid #1976d2',
                        }}
                    />
                    <Divider sx={{ my: 2 }} />
                    <Stack spacing={2}>
                        <Button variant="contained" fullWidth onClick={handleOpenUpdateForm}>
                            {t('profile.updateProfile')}
                        </Button>
                        <Button variant="contained" fullWidth color="error" onClick={handleOpenDeleteForm}>
                            {t('profile.deleteProfile')}
                        </Button>
                        <Button variant="contained" fullWidth onClick={handleOpenAvatarForm}>
                            {t('profile.uploadAvatar')}
                        </Button>
                    </Stack>
                </Paper>

                <Paper sx={{ p: 4, flex: 1 }}>
                    <Typography variant="h5" fontWeight="600" textAlign="left">
                        {user.result.user_firstname} {user.result.user_lastname}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ mb: 2, textAlign: "left" }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {t('profile.myInformation')}
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body1" fontWeight="500">
                            {t('profile.email')}: {user.result.user_email}
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                            {t('profile.city')}: {user.result.user_city ?? t('profile.noData')}
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                            {t('profile.phone')}: {user.result.user_phone ?? t('profile.noData')}
                        </Typography>
                    </Box>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            {t('profile.activities')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {t('profile.activityDescription')}
                        </Typography>
                    </Box>
                </Paper>
            </Stack>

            <UniversalModal
                open={showUpdateForm}
                onClose={handleCloseUpdateForm}
                title={t('profile.updateProfile')}
                content={
                    <UserUpdateForm
                        userId={user.result.user_id}
                        userFirstname={user.result.user_firstname ?? ""}
                        userLastname={user.result.user_lastname ?? ""}
                        userCity={user.result.user_city ?? ""}
                        userPhone={user.result.user_phone ?? ""}
                        onClose={handleCloseUpdateForm}
                        onError={setError}
                    />
                }
            />
            <UniversalModal
                open={showDeleteForm}
                onClose={handleCloseDeleteForm}
                title={t('profile.deleteProfile')}
                content={
                    <UserDeleteForm
                        userId={user.result.user_id}
                        onClose={handleCloseDeleteForm}
                        onError={setError}
                    />
                }
                actions={
                    <Button onClick={handleCloseDeleteForm}>{t('profile.cancel')}</Button>
                }
            />
            <UniversalModal
                open={showAvatarForm}
                onClose={handleCloseAvatarForm}
                title={t('profile.uploadAvatar')}
                content={
                    <UpdateAvatar
                        userId={user.result.user_id}
                        onClose={handleCloseAvatarForm}
                    />
                }
            />
        </Container>
    );
};

export { UserProfile };
