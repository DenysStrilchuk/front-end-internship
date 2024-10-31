import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {authApi} from "../../../api/auth-api";
import {AuthForm} from "../../common/AuthForm";
import {Routes} from "../../../utils/routes";
import {IFormValues} from "../../../types/form-types";

const RegisterForm = () => {
    const {t} = useTranslation();
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (data: IFormValues) => {
        if (data.password !== data.confirmPassword) {
            setError(t('register.passwordMismatch'));
            return;
        }
        try {
            await authApi.registerUser({
                user_email: data.email,
                user_firstname: data.firstName || '',
                user_lastname: data.lastName || '',
                user_password: data.password,
                user_password_repeat: data.confirmPassword,
            });
            navigate(Routes.LOGIN);
        } catch (err) {
            const errorMessage = (err as Error).message;
            let translatedErrorMessage;
            switch (errorMessage) {
                case 'User with this email address already exists.':
                    translatedErrorMessage = t('auth.errors.register.emailExists');
                    break;
                default:
                    translatedErrorMessage = t('auth.errors.register.default');
            }

            setError(translatedErrorMessage);
        }
    };

    return (
        <AuthForm
            title="register.title"
            onSubmit={handleRegister}
            error={error}
            showConfirmPassword={true}
            showNameFields={true}
            defaultValues={{
                email: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: '',
            }}
        />
    );
};

export {RegisterForm};
