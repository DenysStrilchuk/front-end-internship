import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, TextField} from "@mui/material";

import {useAppDispatch} from "../../../hooks";
import {updateUser} from "../../../store/slices";
import {IUpdateUser} from "../../../models/IUser";
import {userUpdateValidationSchema} from "../../../validators/userUpdateForm-validator";
import styles from './UserUpdateForm.module.css';

interface UserUpdateFormProps {
    userId: number;
    userFirstname: string;
    userLastname: string;
    userCity: string;
    userPhone: string;
    onClose: () => void;
    onError: (message: string) => void;
}

const UserUpdateForm: React.FC<UserUpdateFormProps> = ({
        userId,
        userFirstname,
        userLastname,
        userCity,
        userPhone,
        onClose,
        onError
    }) => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();

    const [formData, setFormData] = useState<IUpdateUser>({
        user_firstname: userFirstname,
        user_lastname: userLastname,
        user_city: userCity,
        user_phone: userPhone,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setSubmissionError(null);

        const {error} = userUpdateValidationSchema.validate(formData, {abortEarly: false});
        if (error) {
            const validationErrors: { [key: string]: string } = {};
            error.details.forEach((detail) => {
                const field = detail.path[0].toString();
                validationErrors[field] = t(detail.message);
            });
            setErrors(validationErrors);
            return;
        }

        try {
            await dispatch(updateUser({userId, data: formData})).unwrap();
            onClose();
        } catch (error) {
            const errorMessage = t(error as string);
            setSubmissionError(errorMessage);
            onError(errorMessage);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="user_firstname"
                    value={formData.user_firstname}
                    onChange={handleChange}
                    placeholder={t("updateUser.userFirstname")}
                    error={Boolean(errors.user_firstname)}
                    helperText={errors.user_firstname}
                    fullWidth
                />
                <TextField
                    name="user_lastname"
                    value={formData.user_lastname}
                    onChange={handleChange}
                    placeholder={t("updateUser.userLastname")}
                    error={Boolean(errors.user_lastname)}
                    helperText={errors.user_lastname}
                    fullWidth
                />
                <TextField
                    name="user_city"
                    value={formData.user_city}
                    onChange={handleChange}
                    placeholder={t("updateUser.city")}
                    error={Boolean(errors.user_city)}
                    helperText={errors.user_city}
                    fullWidth
                />
                <TextField
                    name="user_phone"
                    value={formData.user_phone}
                    onChange={handleChange}
                    placeholder={t("updateUser.phone")}
                    error={Boolean(errors.user_phone)}
                    helperText={errors.user_phone}
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    {t("updateUser.saveChanges")}
                </Button>
                <Button type="button" variant="outlined" color="secondary" onClick={onClose}>
                    {t("updateUser.cancel")}
                </Button>
                {submissionError && <p className={styles.errorMessage}>{submissionError}</p>}
            </form>
        </div>
    );
};

export {UserUpdateForm};
