import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {authApi} from "../../../api/auth-api";
import {AuthForm} from "../../common/AuthForm";
import {IApiError} from "../../../types/api-types/errorTypes";

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
            const errorMessage = (err as IApiError).response?.data?.message || t('register.errorMessage');
            setError(errorMessage);
        }
    };

    const fields = [
        {
            label: 'register.emailLabel',
            type: 'email',
            name: 'user_email',
            value: email,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
        },
        {
            label: 'register.firstNameLabel',
            type: 'text',
            name: 'user_firstname',
            value: firstName,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)
        },
        {
            label: 'register.lastNameLabel',
            type: 'text',
            name: 'user_lastname',
            value: lastName,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)
        },
        {
            label: 'register.passwordLabel',
            type: 'password',
            name: 'user_password',
            value: password,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
        },
        {
            label: 'register.confirmPasswordLabel',
            type: 'password',
            name: 'user_password_repeat',
            value: confirmPassword,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)
        },
    ];

    return <AuthForm title="register.title" onSubmit={handleRegister} fields={fields} error={error}/>;
};

export {RegisterForm};
