import React, {useState} from 'react';
import {TextField, Button, Typography, Box} from '@mui/material';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {authApi} from "../../../api/auth-api/authApi";
import {authActions} from "../../../store/slices/authSlice";

const LoginForm = () => {
    const {t} = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await authApi.loginUser({user_email: email, user_password: password});
            dispatch(authActions.setToken(response.token));
            navigate('/');
        } catch (err) {
            setError(t('login.errorMessage'));
        }
    };

    return (
        <Box sx={{maxWidth: 400, mx: 'auto', mt: 4}}>
            <Typography variant="h5" gutterBottom>
                {t('login.title')}
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label={t('login.emailLabel')}
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label={t('login.passwordLabel')}
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
                sx={{mt: 2}}
            >
                {t('login.submitButton')}
            </Button>
        </Box>
    );
};

export {LoginForm};
