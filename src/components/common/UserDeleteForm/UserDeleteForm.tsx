import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import Button from '@mui/material/Button';

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {handleLogout} from "../../../utils/logout-helper";
import {deleteUser} from "../../../store/slices";

interface UserDeleteFormProps {
    userId: number;
    onError: (message: string) => void;
    onClose: () => void;
}

const UserDeleteForm: React.FC<UserDeleteFormProps> = ({userId, onError, onClose}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [confirm, setConfirm] = useState(false);
    const errorMessage = useAppSelector((state) => state.users.errorMessage);

    const handleConfirmSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setConfirm(true);
    };

    const handleDeleteSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(deleteUser(userId));
        if (!errorMessage) {
            handleLogout(dispatch, navigate);
        } else {
            onError(errorMessage || t('deleteUser.error.deleteFailed'));
        }
    };

    return (
        <div>
            <p>{t('deleteUser.confirmationMessage')}</p>
            {!confirm ? (
                <form onSubmit={handleConfirmSubmit}>
                    <Button type="submit" variant="contained" color="primary">
                        {t('deleteUser.confirmDelete')}
                    </Button>
                </form>
            ) : (
                <form onSubmit={handleDeleteSubmit}>
                    <Button type="submit" variant="contained" color="error">
                        {t('deleteUser.yesDelete')}
                    </Button>
                    <Button type="button" variant="outlined" color="secondary" onClick={onClose}>
                        {t('deleteUser.cancel')}
                    </Button>
                </form>
            )}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export {UserDeleteForm};
