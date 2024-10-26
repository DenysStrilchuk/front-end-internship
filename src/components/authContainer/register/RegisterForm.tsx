import React, {useState} from 'react';
import {TextField, Button, Typography, Box} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {authApi} from "../../../api/auth-api/authApi";

const RegisterForm = () => {
    const {t} = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError(t('register.passwordMismatch'));
            return;
        }
        try {
            await authApi.registerUser({
                user_email: email,
                user_password: password,
                user_password_repeat: confirmPassword,
                user_firstname: firstName,
                user_lastname: lastName,
            });
            navigate('/login');
        } catch (err) {
            setError(t('register.errorMessage'));
        }
    };

    return (
        <Box sx={{maxWidth: 400, mx: 'auto', mt: 4}}>
            <Typography variant="h5" gutterBottom>
                {t('register.title')}
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label={t('register.emailLabel')}
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label={t('register.firstNameLabel')}
                type="text"
                fullWidth
                margin="normal"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
                label={t('register.lastNameLabel')}
                type="text"
                fullWidth
                margin="normal"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
                label={t('register.passwordLabel')}
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                label={t('register.confirmPasswordLabel')}
                type="password"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleRegister}
                sx={{mt: 2}}
            >
                {t('register.submitButton')}
            </Button>
        </Box>
    );
};

export {RegisterForm};
