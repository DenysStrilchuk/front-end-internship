import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Button from '@mui/material/Button';

import {useAppDispatch} from '../../../hooks';
import {updateCompanyAvatar} from '../../../store/slices/companySlice';
import styles from './UpdateCompanyAvatar.module.css';

interface UpdateCompanyAvatarProps {
  companyId: number;
  onClose: () => void;
}

const UpdateCompanyAvatar: React.FC<UpdateCompanyAvatarProps> = ({companyId, onClose}) => {
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
      const resultAction = await dispatch(updateCompanyAvatar({companyId, file}));
      if (updateCompanyAvatar.fulfilled.match(resultAction)) {
        onClose();
      } else {
        setError(t('avatar.error.default'));
      }
    } catch {
      setError(t('avatar.error.uploadFailed'));
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

export {UpdateCompanyAvatar};
