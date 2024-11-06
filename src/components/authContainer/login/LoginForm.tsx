import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {authApi} from "../../../api/auth-api";
import {authActions} from "../../../store/slices";
import {ITokenResponse} from "../../../types/api-types/authTypes";
import {Routes} from "../../../utils/routes";
import {AuthForm} from "../../common/AuthForm";

const LoginForm = () => {
    const {t} = useTranslation();
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (data: { email: string; password: string; }): Promise<void> => {
        try {
            const response: ITokenResponse = await authApi.loginUser({
                user_email: data.email,
                user_password: data.password,
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
        } catch (err) {
            const errorMessage = (err as Error).message;
            const translatedErrorMessage =
                errorMessage === 'Invalid login or password.'
                    ? t('auth.errors.login.invalidAuth')
                    : t('auth.errors.login.default');

            setError(translatedErrorMessage);
        }
    };

    return (
        <AuthForm
            title="login.title"
            onSubmit={handleLogin}
            error={error}
            showConfirmPassword={false}
            showNameFields={false}
            defaultValues={{email: '', password: ''}}
        />
    );
};

export {LoginForm};
