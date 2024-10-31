import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from "../../../hooks";

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

    const handleDelete = async () => {
        try {
            const resultAction = await dispatch(deleteUser(userId));

            if (deleteUser.fulfilled.match(resultAction)) {
                handleLogout(dispatch, navigate);
            } else if (deleteUser.rejected.match(resultAction)) {
                const errorMessage = (resultAction.payload as {
                    message?: string
                })?.message || t('deleteUser.error.deleteFailed');
                onError(errorMessage);
            }
        } catch (err) {
            const errorMessage = (err as Error).message;
            let translatedErrorMessage;

            switch (errorMessage) {
                case 'Failed to delete user.':
                    translatedErrorMessage = t('deleteUser.errors.deleteFailed');
                    break; // Додано break для завершення свічу
                default:
                    translatedErrorMessage = t('deleteUser.error.unknownError');
            }
            onError(translatedErrorMessage);
        }
    };

    return (
        <div>
            <p>{t('deleteUser.confirmationMessage')}</p>
            {!confirm ? (
                <button onClick={() => setConfirm(true)}>{t('deleteUser.confirmDelete')}</button>
            ) : (
                <>
                    <button onClick={handleDelete}>{t('deleteUser.yesDelete')}</button>
                    <button onClick={onClose}>{t('deleteUser.cancel')}</button>
                </>
            )}
        </div>
    );
};

export {UserDeleteForm};
