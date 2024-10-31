import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {userApi} from "../../../api/user-api";
import {useAppDispatch} from "../../../hooks";
import {getMe} from "../../../store/slices";

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
    const [formData, setFormData] = useState({
        user_firstname: userFirstname,
        user_lastname: userLastname,
        user_city: userCity,
        user_phone: userPhone,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await userApi.updateUser(userId, formData);
            dispatch(getMe());
            onClose();
        } catch (error) {
            if (error instanceof Error) {
                onError(error.message);
            } else {
                onError("An unknown error occurred.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="user_firstname" value={formData.user_firstname} onChange={handleChange}
                   placeholder={t("profile.userFirstname")}/>
            <input type="text" name="user_lastname" value={formData.user_lastname} onChange={handleChange}
                   placeholder={t("profile.userLastname")}/>
            <input type="text" name="user_city" value={formData.user_city} onChange={handleChange} placeholder={t("profile.city")}/>
            <input type="text" name="user_phone" value={formData.user_phone} onChange={handleChange}
                   placeholder={t("profile.phone")}/>
            <button type="submit">{t("profile.saveChanges")}</button>
            <button type="button" onClick={onClose}>{t("profile.cancel")}</button>
        </form>
    );
};

export {UserUpdateForm};
