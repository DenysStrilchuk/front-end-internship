import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {userApi} from "../../../api/user-api";
import {useAppDispatch} from "../../../hooks";
import {userActions} from "../../../store/slices";

const UpdateAvatar = ({userId, onClose}: { userId: number; onClose: () => void }) => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const {t} = useTranslation();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (file) {
            try {
                const updatedUser = await userApi.updateAvatar(userId, file);
                if (updatedUser.user_avatar) {
                    dispatch(userActions.updateUserAvatar(updatedUser.user_avatar));
                } else {
                    setError(t('avatar.error.avatarUrlMissing'));
                }
                onClose();
            } catch (err) {
                const errorMessage = (err as Error).message;
                let translatedErrorMessage;
                switch (errorMessage) {
                    case 'Avatar update failed.':
                        translatedErrorMessage = t('avatar.error.updateFailed');
                        break;
                    default:
                        translatedErrorMessage = t('avatar.error.default');
                }
                setError(translatedErrorMessage);
            }
        } else {
            setError(t('avatar.error.noFileSelected'));
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange}/>
            <button onClick={handleSubmit}>{t('avatar.uploadAvatar')}</button>
            <button onClick={onClose}>{t('avatar.cancel')}</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export {UpdateAvatar};
