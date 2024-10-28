import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {TextField, Button, Typography, Box, IconButton} from '@mui/material';
import {useTranslation} from 'react-i18next';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

import {IFormValues} from '../../../types/form-types';
import {loginValidationSchema, registrationValidationSchema} from '../../../validators/auth-validator';

interface AuthFormProps {
    title: string;
    onSubmit: (data: IFormValues) => void;
    error: string | null;
    showConfirmPassword?: boolean;
    showNameFields?: boolean;
    defaultValues: IFormValues;
}

const AuthForm: React.FC<AuthFormProps> = ({
                                               title,
                                               onSubmit,
                                               error,
                                               showConfirmPassword,
                                               showNameFields,
                                               defaultValues,
                                           }) => {
    const {t} = useTranslation();
    const validationSchema = showNameFields ? registrationValidationSchema : loginValidationSchema;

    const {
        control,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<IFormValues>({
        resolver: joiResolver(validationSchema),
        mode: 'onChange',
        defaultValues,
    });

    const translateError = (errorKey: string | undefined) => (errorKey ? t(errorKey) : '');

    return (
        <Box sx={{maxWidth: 400, mx: 'auto', mt: 4}}>
            <Typography variant="h5" gutterBottom>
                {t(title)}
            </Typography>
            {error && <Typography color="error">{error}</Typography>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label={t('register.emailLabel')}
                            fullWidth
                            margin="normal"
                            error={!!errors.email}
                            helperText={translateError(errors.email?.message)}
                        />
                    )}
                />

                {showNameFields && (
                    <>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label={t('register.firstNameLabel')}
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.firstName}
                                    helperText={translateError(errors.firstName?.message)}
                                />
                            )}
                        />

                        <Controller
                            name="lastName"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label={t('register.lastNameLabel')}
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.lastName}
                                    helperText={translateError(errors.lastName?.message)}
                                />
                            )}
                        />
                    </>
                )}

                <Controller
                    name="password"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label={t('register.passwordLabel')}
                            type="password"
                            fullWidth
                            margin="normal"
                            error={!!errors.password}
                            helperText={translateError(errors.password?.message)}
                        />
                    )}
                />

                {showConfirmPassword && (
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label={t('register.confirmPasswordLabel')}
                                type="password"
                                fullWidth
                                margin="normal"
                                error={!!errors.confirmPassword}
                                helperText={translateError(errors.confirmPassword?.message)}
                            />
                        )}
                    />
                )}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{mt: 2}}
                    disabled={!isValid}
                >
                    {t('common.submitButton')}
                </Button>
            </form>

            <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                <Box sx={{flexGrow: 1, height: '1px', backgroundColor: 'grey.400'}}/>
                <Typography variant="body2" sx={{mx: 2}}>
                    {t('common.or')}
                </Typography>
                <Box sx={{flexGrow: 1, height: '1px', backgroundColor: 'grey.400'}}/>
            </Box>

            <Box display="flex" justifyContent="center" sx={{mt: 1}}>
                <IconButton color="primary">
                    <GoogleIcon/>
                </IconButton>
                <IconButton color="primary">
                    <FacebookIcon/>
                </IconButton>
                <IconButton color="primary">
                    <AppleIcon/>
                </IconButton>
                <IconButton color="primary">
                    <GitHubIcon/>
                </IconButton>
                <IconButton color="primary">
                    <LinkedInIcon/>
                </IconButton>
                <IconButton color="primary">
                    <TwitterIcon/>
                </IconButton>
            </Box>
        </Box>
    );
};

export {AuthForm};
