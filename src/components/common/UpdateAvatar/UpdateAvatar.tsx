import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Button from '@mui/material/Button';

import {userApi} from "../../../api/user-api";
import {useAppDispatch} from "../../../hooks";
import {userActions} from "../../../store/slices";
import {IValidationErrorResponse} from "../../../types/api-types/validationErrorTypes";
import styles from './UpdateAvatar.module.css';

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError(t('avatar.error.noFileSelected'));
      return;
    }
    try {
      const updatedUser = await userApi.updateAvatar(userId, file);

      if (updatedUser && updatedUser.user_avatar) {
        dispatch(userActions.updateUserAvatar(updatedUser.user_avatar));
      } else {
        setError(t('avatar.error.avatarUrlMissing'));
      }
      onClose();
    } catch (err) {
      const errorResponse = err as IValidationErrorResponse;
      const errorMessage = errorResponse.detail
        ? errorResponse.detail.map(error => error.msg).join(', ')
        : t('avatar.error.default');
      setError(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
        />
        <Button type="submit" variant="contained" color="success" className={styles.submitButton}>
          {t('avatar.uploadAvatar')}
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose} className={styles.cancelButton}>
          {t('avatar.cancel')}
        </Button>
      </form>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export {UpdateAvatar};
