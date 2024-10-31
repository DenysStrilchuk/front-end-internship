import React, { useState } from 'react';
import { userApi } from "../../../api/user-api";
import { useAppDispatch } from "../../../hooks";
import { getMe } from "../../../store/slices";

interface UserUpdateFormProps {
    userId: number;
    userFirstname: string;
    userLastname: string;
    userStatus: string;
    userCity: string;
    userPhone: string;
    onClose: () => void;
    onError: (message: string) => void;
}

const UserUpdateForm: React.FC<UserUpdateFormProps> = ({
                                                           userId,
                                                           userFirstname,
                                                           userLastname,
                                                           userStatus,
                                                           userCity,
                                                           userPhone,
                                                           onClose,
                                                           onError
                                                       }) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        user_firstname: userFirstname,
        user_lastname: userLastname,
        user_status: userStatus,
        user_city: userCity,
        user_phone: userPhone,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
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
            <input type="text" name="user_firstname" value={formData.user_firstname} onChange={handleChange} placeholder="First Name" />
            <input type="text" name="user_lastname" value={formData.user_lastname} onChange={handleChange} placeholder="Last Name" />
            <input type="text" name="user_status" value={formData.user_status} onChange={handleChange} placeholder="Status" />
            <input type="text" name="user_city" value={formData.user_city} onChange={handleChange} placeholder="City" />
            <input type="text" name="user_phone" value={formData.user_phone} onChange={handleChange} placeholder="Phone" />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export { UserUpdateForm };
