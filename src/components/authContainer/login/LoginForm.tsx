import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {authApi} from "../../../api/auth-api";
import {authActions} from "../../../store/slices";
import {ITokenResponse} from "../../../types/api-types/authTypes";
import {Routes} from "../../../utils";
import {AuthForm} from "../../common/AuthForm";

const LoginForm = () => {
    const {t} = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (): Promise<void> => {
        try {
            const response: ITokenResponse = await authApi.loginUser({
                user_email: email,
                user_password: password,
            });

            const {access_token, token_type, expires_in} = response.result;

            dispatch(
                authActions.setToken({
                    access_token,
                    token_type,
                    expires_in,
                })
            );

            navigate(Routes.HOME);
        } catch (_err) {
            setError(t('login.errorMessage'));
        }
    };

    const fields = [
        {
            label: 'login.emailLabel',
            type: 'email',
            name: 'user_email',
            value: email,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
        },
        {
            label: 'login.passwordLabel',
            type: 'password',
            name: 'user_password',
            value: password,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
        },
    ];

    return <AuthForm title="login.title" onSubmit={handleLogin} fields={fields} error={error}/>;
};

export {LoginForm};
