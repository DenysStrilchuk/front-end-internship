import React from 'react';
import {TextField, Button, Typography, Box, IconButton} from '@mui/material';
import {useTranslation} from 'react-i18next';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';

interface Field {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface AuthFormProps {
    title: string;
    onSubmit: () => void;
    fields: Field[];
    error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({title, onSubmit, fields, error}) => {
    const {t} = useTranslation();

    return (
        <Box sx={{maxWidth: 400, mx: 'auto', mt: 4}}>
            <Typography variant="h5" gutterBottom>
                {t(title)}
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            {fields.map(({label, type, value, onChange}, index) => (
                <TextField
                    key={index}
                    label={t(label)}
                    type={type}
                    fullWidth
                    margin="normal"
                    value={value}
                    onChange={onChange}
                />
            ))}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onSubmit}
                sx={{mt: 2}}
            >
                {t('common.submitButton')}
            </Button>

            <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                <Box sx={{flexGrow: 1, height: '1px', backgroundColor: 'grey.400'}}/>
                <Typography variant="body2" sx={{mx: 2}}>
                    {t('common.or')}
                </Typography>
                <Box sx={{flexGrow: 1, height: '1px', backgroundColor: 'grey.400'}}/>
            </Box>

            <Box display="flex" justifyContent="center" sx={{mt: 1}}>
                <IconButton color="primary"><GoogleIcon/></IconButton>
                <IconButton color="primary"><FacebookIcon/></IconButton>
                <IconButton color="primary"><AppleIcon/></IconButton>
                <IconButton color="primary"><GitHubIcon/></IconButton>
                <IconButton color="primary"><LinkedInIcon/></IconButton>
                <IconButton color="primary"><TwitterIcon/></IconButton>
            </Box>
        </Box>
    );
};

export {AuthForm};
